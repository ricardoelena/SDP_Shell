//remenber to run npm init -y

function getHeaders() {
    return {
        "Accept": "application/vnd.appgate.peer-v19+json",
        "content-type": "application/json",
        "authorization": AUTHTOKEN
    }
}

async function myAsyncFunction() {
