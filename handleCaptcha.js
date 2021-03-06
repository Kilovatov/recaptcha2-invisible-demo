let globalToken;
const sendToGoogleButton = document.getElementById("button-send");
const tokenJumbotron = document.getElementById("token");
const tokenContainer = document.getElementById("token-place");
const googleRespJumbotron = document.getElementById("google");
const googleRespContainer = document.getElementById("response");

const executeButton = document.getElementById("execute");
const resetButton = document.getElementById("reset");



function onSubmit(token) {
    tokenJumbotron.classList.remove('d-none');
    globalToken = token;
    tokenContainer.innerHTML = globalToken;
    sendToGoogleButton.classList.remove('d-none');
}

executeButton.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    grecaptcha.execute();
});


resetButton.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    grecaptcha.reset();
});

sendToGoogleButton.addEventListener('click', (event) => {
    event.preventDefault();
    fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'post',
        body: `secret=6Lc56mwUAAAAAHdcsO4e4TyhD2XQtXcvYQAmfaIj&response=${globalToken}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then((response) => response.json()).then(function(data) {
        googleRespJumbotron.classList.remove('d-none');
        googleRespContainer.innerHTML = JSON.stringify(data);
    });
});