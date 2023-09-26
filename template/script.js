//remenber to run npm init -y

function getheaders() {
    return {
        "Accept": "application/vnd.appgate.peer-v19+json",
        "content-type": "application/json"
    }
}

const ctl='https://ricoctl.packnot.com:8443/admin'

const response = await fetch('https://ricoctl.packnot.com:8443/admin/identity-providers/names', {  
    method: 'GET', 
    headers: getheaders()
});
const data = await response.json();

console.log(data);
