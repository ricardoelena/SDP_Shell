#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# Get the parent directory (one level up)
currentdir="$(dirname "$SCRIPT_DIR")"  
server=""
token=""

source $currentdir/bin/SDP_login.sh

if [ $? -ne 0 ]; then
    echo "Failed to source your_script.sh"
else
    echo "Script sourced successfully"
fi


if [ -f "$currentdir/data/current" ]
then
    server=`sed -n '1p' $currentdir/data/current`
fi

session=$(session_check $currentdir)

token=`jq '.token' $currentdir/data/$server | cut -d\" -f2`
token="Authorization: Bearer "$token

