import { URI } from `./script.js`;

// Sending IDs to the API function
export function login() {
    // Retrieving the form
    const loginForm = document.querySelector(`#login-form form [type=button]`);
    // Adding the eventListener
    loginForm.onclick = async function () {
        // Retrieving form values
        const log = {
            email: document.querySelector(`[name=email]`).value,
            password: document.querySelector(`[name=password]`).value
        };
        // Creating the log in JSON format
        const logJson = JSON.stringify(log);
        // Calling the fetch function
        const tokenReturn = await fetch(`${URI}users/login`, {
            method: `POST`,
            headers: { "Content-Type": `application/json` },
            body: logJson
        });
        // Processing the API response
        // If user correctly entered their IDs
        if (tokenReturn.status === 200) {
            document.getElementById(`error-message`).innerText = ``;
            const token = await tokenReturn.json();
            // Storing the token in the sessionStorage
            window.sessionStorage.setItem(`userId`, token.userId);
            window.sessionStorage.setItem(`token`, token.token);
            // Redirection to the home page
            document.location.href = `./index.html`;
            // If user entered wrong password
        } else if (tokenReturn.status === 401) {
            document.getElementById(`error-message`).innerText = `Mot de passe incorrect.`;
            // If user doesn't exist in the DB
        } else if (tokenReturn.status === 404) {
            document.getElementById(`error-message`).innerText = `Identifiant inconnu.`;
        };
    };
};


// Edit mode display
if (window.sessionStorage.token) {
    const editionBlock = document.querySelector(`.edition-block`).classList.add(`connected`);
    const header = document.querySelector(`.index header`).classList.add(`connected-header`);
};


