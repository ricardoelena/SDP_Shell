#!/bin/bash

    curl -c $1/data/$2.cookie -k --location --request POST $3/authentication \
    --header 'Content-Type: application/json' \
    --header 'Accept: application/vnd.appgate.peer-v17+json' \
    --data-raw '{
        "providerName": "'"$4"'",
        "deviceId": "'"$5"'",
        "username": "'"$6"'",
        "password": "'"$7"'",
        "samlResponse": "" 
    }'
