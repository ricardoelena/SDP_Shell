#!/bin/bash

command_help () {
	echo "Usage login.sh:"
	echo "    -h		Display this help message."
	echo "    -u		Admin user."
	echo "    -p		Admin password."
	echo "    -s		Controller FDQN."
	echo "    -f		Read configuracion from file in access forlder."
}

session_check () {
	auth_ok=`jq '.id' data/$server | cut -d\" -f2`
	if [  "$auth_ok" = "unauthorized" ]; then
		echo "Authentication Failed"	
		exit 0
	fi 
}


#checks the script comes with one argument
if [ $# -eq 0 ]; then
	echo "No arguments provided"
	command_help
	exit 0 
fi

#initialize vars
server="" #parameter expected as arg
auth_ok=""
base=""
#base="https://$server:8443/admin" #base expects port 8443
deviceid=`uuidgen | tr "[:upper:]" "[:lower:]"` #every login a random uuid will be generated
token="" #token placeholder
currentDate=`date -u +%s`
tokenDate="" #token expiration date placeholder
acceptHeader="Accept: application/vnd.appgate.peer-v15+json"
user="" #parameter expected as arg
pass="" #parameter expected as arg
currentdir=`pwd`
errorlog=""

#initialize dirs
if [ ! -d $currentdir/data ]; then
  mkdir -p $currentdir/data;
fi

if [ ! -d $currentdir/cert ]; then
  mkdir -p $currentdir/cert;
fi

#Get arguments
while getopts 'u:p:s:f:h' opt; do
	case "${opt}" in
    		u)	user="$OPTARG" ;;
		p)	pass="$OPTARG" ;;
		s) 
			server="${OPTARG}"
			base="https://$server:8443/admin" #base expects port 8443
		;;
		f) 
			if [ ! -f $OPTARG ]; then
  				echo "File not found!"
				exit 0
			fi
			user=`cat $OPTARG | grep user | cut -d= -f2`
			pass=`cat $OPTARG | grep pass | cut -d= -f2`
		;;
		h)
			command_help
			exit 0
		;;
		\? )
			echo "Invalid Option: -$OPTARG" 1>&2
			exit 1
		;;
	  esac
done

#Validate required values
if [ -z "$server" ]
then
	errorlog="-No server provided\n"
fi
if [ -z "$user" ]
then
	errorlog="${errorlog}-No user provided\n"
fi
if [ -z "$pass" ]
then
	# Read Password
	echo -n Password: 
	read -s pass
	echo

	if [ -z "$pass" ]
	then
		errorlog="${errorlog}-No password provided\n"
	fi
fi

if [ ! -z "${errorlog}" ]
then
	echo -e ${errorlog}
	exit 0
fi

#Funtion in charge of auth token request and establish expiration date for token information save under "data/$server"
login () { 
	curl -k --location --request POST $base/login \
	--header 'Content-Type: application/json' \
	--header 'Accept: application/vnd.appgate.peer-v15+json' \
	--data-raw '{
	    "providerName": "local",
	    "deviceId": "'"$deviceid"'",
	    "username": "'"$user"'",
	    "password": "'"$pass"'",
	    "samlResponse": "" 
	}'  | python -m json.tool 
}

#funtion in charge of dowload pem cert from controller
cert () { 
	curl -k --location --request GET $base/certificate-authority/ca \
	--header 'Accept: application/vnd.appgate.peer-v15+json' | python -m json.tool > data/$server.cert
	echo -----BEGIN CERTIFICATE----- > cert/$server.pem
	jq '.certificate' data/$server.cert | tr -d '"' >> cert/$server.pem
	echo -----END CERTIFICATE----- >> cert/$server.pem
}



if [ ! -f data/$server ]; then
	login > data/$server
	session_check 
	cert
else
	#check token expiration
	tokenDate=`jq '.expires' data/$server | cut -d. -f1 | cut -d\" -f2`
	tokenDate=`date -j -u  -f "%Y-%m-%dT%T" "$tokenDate" +%s`
	let diffDate=tokenDate-currentDate
	if [ ! $diffDate -gt "0" ]; then
		login > data/$server
		session_check
		cert
	fi 
fi


token=`jq '.token' data/$server`
token="Authorization: Bearer "$token
