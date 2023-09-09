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


get_IdP () {
    curl -k --location --request GET $base/identity-providers/names \
        --header 'Content-Type: application/json' \
        --header 'Accept: application/vnd.appgate.peer-v17+json' | jq 
}

#checks that there is at least  one argument
if [ $# -eq 0 ]; then
	echo "No arguments provided"
	#command_help
	#exit 0 
fi

#initialize vars
server="" #parameter expected as arg
auth_ok=""
base=""
idp=""
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
			idp=`cat $OPTARG | grep idp | cut -d= -f2`
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
    echo -n Controller FQDN:
    read server
    base="https://$server:8443/admin"
	#errorlog="-No server provided\n"
fi
if [ -z "$user" ]
then
    echo $server
    get_IdP > data/$server.idp   
    echo "Select the IdP"
    cat data/$server.idp | jq -r '.data[] | "\(.name)"' | awk '{print NR, $0}'
    read idp 
    idp=`cat data/$server.idp | jq -r --arg jqvar "$idp" '.data[($jqvar | tonumber) - 1].name' `
	echo -n User:
    read user
    #errorlog="${errorlog}-No user provided\n"
fi
if [ -z "$pass" ]
then
	# Read Password
	echo -n Password: 
	read -s pass
	echo

	if [ -z "$pass" ]
	then
        echo -n Password:
        read -s pass
	#	errorlog="${errorlog}-No password provided\n"
	fi
fi

if [ ! -z "${errorlog}" ]
then
	echo -e ${errorlog}
	exit 0
fi

#Funtion in charge of auth token request and establish expiration date for token information save under "data/$server"
login () { 
    get_IdP 
	curl -k --location --request POST $base/login \
	--header 'Content-Type: application/json' \
	--header 'Accept: application/vnd.appgate.peer-v17+json' \
	--data-raw '{
	    "providerName": "'"$idp"'",
	    "deviceId": "'"$deviceid"'",
	    "username": "'"$user"'",
	    "password": "'"$pass"'",
	    "samlResponse": "" 
	}'  | jq
}

#funtion in charge of dowload pem cert from controller
cert () { 
	curl -k --location --request GET $base/certificate-authority/ca \
	--header 'Accept: application/vnd.appgate.peer-v17+json' | jq > data/$server.cert
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
