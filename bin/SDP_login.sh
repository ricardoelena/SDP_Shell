#!/bin/bash

session_check () {
    auth_ok=jq -r 'select(.id) | .id' $currentdir/data/$server | cut -d\" -f2
    if [  "$auth_ok" = "unauthorized" ]; then
        echo "Authentication Failed"	
        rm $currentdir/data/$server
        rm $currentdir/dara/current
        exit 0
    elif [ "$auth_ok" = "precondition failed" ]; then
        mfa > $currentdir/data/$server 
        needMFA=jq '.user.needTwoFactorAuth' $currentdir/data/$server
        if [ $needMFA ]; then
            authToken=jq '.token' $currentdir/data/$server | cut -d\" -f2
            authToken="Authorization: Bearer "$authToken
            otp_start > $currentdir/data/$server.otpstart
            echo -n Add OTP:            
            read mfaotp
            otp_end > $currentdir/data/$server
            auth_ok=jq -r 'select(.id) | .id' $currentdir/data/$server | cut -d\" -f2
            if [  "$auth_ok" = "unauthorized" ]; then
                echo "Invalid OTP"
                exit 0
            else
                echo $server > $currentdir/data/current
            fi
        fi
    else
        echo $auth_ok auth OK
        echo $server > $currentdir/data/current
    fi 
}

get_IdP () {
    curl -s -k --location --request GET $base/identity-providers/names \
        --header 'Content-Type: application/json' \
        --header 'Accept: application/vnd.appgate.peer-v17+json' | jq 
    }

#initialize vars
server="" #parameter expected as arg
auth_ok=""
base=""
idp=""
#base="https://$server:8443/admin" #base expects port 8443
deviceid=uuidgen | tr "[:upper:]" "[:lower:]" #every login a random uuid will be generated
token="" #token placeholder
currentDate=date -u +%s
tokenDate="" #token expiration date placeholder
acceptHeader="Accept: application/vnd.appgate.peer-v15+json"
user="" #parameter expected as arg
pass="" #parameter expected as arg
mfaotp=""
# Get the directory of the script
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Get the parent directory (one level up)
currentdir="$(dirname "$SCRIPT_DIR")"
errorlog=""

[ "$1" = "reset" ] && rm -f $currentdir/data/current

#initialize dirs
if [ ! -d $currentdir/data ]; then
    mkdir -p $currentdir/data;
fi

if [ ! -d $currentdir/cert ]; then
    mkdir -p $currentdir/cert;
fi

#Validate values
if [ ! -f "$currentdir/data/current" ] 
then
    if [ -z "$server" ]
    then
        echo -n Controller FQDN:
        read server
        base="https://$server:8443/admin"
    fi
    if [ -z "$user" ]
    then
        get_IdP > $currentdir/data/$server.idp   
        echo "IdPs Available"        
        cat $currentdir/data/$server.idp | jq -r '.data[] | "\(.name)"' | awk '{print NR, $0}'
        echo -n Select IdP:
        read idp 
        idp=cat $currentdir/data/$server.idp | jq -r --arg jqvar "$idp" '.data[($jqvar | tonumber) - 1].name' 
        echo -n User:
        read user
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
else
    server=sed -n '1p' $currentdir/data/current
fi

#Funtion in charge of auth token request and establish expiration date for token information save under "data/$server"
login () { 
    get_IdP 
    curl -s -k --location --request POST $base/login \
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

    mfa () {
        curl  -k --location --request POST $base/authentication \
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

            otp_start () {
                curl  -k --location --request POST $base/authentication/otp/initialize \
                    --header 'Content-Type: application/json' --header 'Accept: application/vnd.appgate.peer-v17+json' --header "$authToken" --data-raw '{
                                    "userPassword": "'"$pass"'"
                                }' | jq 
                            }

                            otp_end () {
                                curl  -k --location --request POST $base/authentication/otp \
                                    --header 'Content-Type: application/json' \
                                    --header 'Accept: application/vnd.appgate.peer-v17+json' \
                                    --header "$authToken" \
                                    --data-raw '{
                                                                    "otp": "'"$mfaotp"'"
                                                                }'  | jq
                                                            }

#funtion in charge of dowload pem cert from controller
cert () { 
    curl -s -k --location --request GET $base/certificate-authority/ca \
        --header 'Accept: application/vnd.appgate.peer-v17+json' | jq > $currentdir/data/$server.cert
            echo -----BEGIN CERTIFICATE----- > $currentdir/cert/$server.pem
            jq '.certificate' $currentdir/data/$server.cert | tr -d '"' >> $currentdir/cert/$server.pem
            echo -----END CERTIFICATE----- >> $currentdir/cert/$server.pem
        }


        if [ ! -f $currentdir/data/$server ] || [ "$1" = "reset" ] 
        then
            login > $currentdir/data/$server
            session_check 
            cert
        else
            #check token expiration
            tokenDate=jq -r 'select(.expires) | .expires' $currentdir/data/$server | cut -d. -f1
            [ -z $tokenDate ] && echo "Session Error" && rm -f $currentdir/data/current $currentdir/data/$server && exit 0
            tokenDate=date -j -u  -f "%Y-%m-%dT%T" "$tokenDate" +%s
            let diffDate=tokenDate-currentDate
            if [ $diffDate -lt "0" ]; then
                echo sigue
                login > $currentdir/data/$server
                session_check
                cert
            else
                echo auth OK
            fi
        fi