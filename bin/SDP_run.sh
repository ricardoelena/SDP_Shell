#!/bin/bash

# Get the directory of the script
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Get the parent directory (one level up)
currentdir="$(dirname "$SCRIPT_DIR")"

source $currentdir/bin/SDP_login.sh

session_check $currentdir

server=`cat $currentdir/data/current`
basectl="https://$server:8443/admin/"


#authToken=`jq '.token' $currentdir/data/$server | sed -n 2p`
authToken=`jq '.token' $currentdir/data/$server |sed -n 2p | cut -d\" -f2`
authToken="\"Bearer $authToken\""

cat $currentdir/template/JS_header.js | sed "s/AUTHTOKEN/$authToken/" | sed "s|/admin/|$basectl|g" > $currentdir/template/temprun.js

[ ! -z  "$1" ] && cat $1 | sed "s|/admin/|$basectl|g" >> $currentdir/template/temprun.js

cat $currentdir/template/JS_footer.js >> $currentdir/template/temprun.js

node $currentdir/template/temprun.js
