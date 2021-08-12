# Bash integration with SDP API

## Objective
Script to automate the extraction of the controller Cert and auth tokens.


## Execution

The script can be executing in two ways, either way the password is an optional parameter, if it's not written the script will request input interaction.

### With Arguments
Setting the arguments directly in the command line

./login -u [admin user] -p [admin password] -s [Controller FQDN]

#### Arguments

Usage login.sh:

| Argument | Description                                   |
| -------- | --------------------------------------------- |
| -h       | Display this help message.                    |
| -u       | Admin user.                                   |
| -p       | Admin password.                               |
| -s       | Controller FDQN.                              |
| -f       | Read configuration from file in access folder |

### With access file
The script will look for the file that most have the user.
The password is optional
The -s argument is required.

./login -f [file with access parameter] -s [Controller FQDN]

#### Example of access file
``` text
user=admin
pass=
```

# Results

The script will generate two folders

| Folder | Reason                                                     |
| ------ | ---------------------------------------------------------- |
| data   | Will store information related to the token and CA         |
| cert   | Will store the cert that can be use with the backup script |


