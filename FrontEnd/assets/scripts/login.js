import { URI } from './script.js';

// Login function
export function login() {
    // Retrieving the form
    const loginForm = document.querySelector(`#login-form form`);
    const loginFormButton = document.querySelector(`#login-form form [type=button]`);
    // Adding eventListeners
    loginForm.onkeydown = function (event) {
        if (event.key === `Enter`) {
            sendingIDs();
        };
    };
    loginFormButton.onclick = sendingIDs;
};

// Retrieving and sending IDs to the API
async function sendingIDs() {
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
        headers: { 'Content-Type': `application/json` },
        body: logJson
    });
    // Processing the API response
    // If user correctly entered their IDs
    if (tokenReturn.status === 200) {
        document.querySelector(`.error-message`).innerText = ``;
        const token = await tokenReturn.json();
        // Storing the user ID and the token in the sessionStorage
        window.sessionStorage.setItem(`userId`, token.userId);
        window.sessionStorage.setItem(`token`, token.token);
        // Redirection to the home page
        document.location.href = `./index.html`;
    // If user entered wrong id or wrong password
    } else if (tokenReturn.status !== 200) {
        document.querySelector(`.error-message`).innerText = `Identifiant ou mot de passe incorrect.`;
    };
};

// Logout function
export function logout() {
    const logoutButton = document.querySelector(`.logout-button`);
    logoutButton.addEventListener(`click`, function () {
        // Retrieving DOM elements to hide
        const editionBanner = document.querySelector(`.edition-banner`).classList.remove(`connected`);
        const header = document.querySelector(`.index header`).classList.remove(`edition-header`);
        const loginButton = document.querySelector(`a[href="./login.html"]`).style.display = null;
        logoutButton.classList.remove(`connected`);
        const editionButton = document.querySelector(`.edition-button`).classList.remove(`connected`);     
        const hiddenElements = Array.from(document.querySelectorAll(`.connected`));
        hiddenElements.forEach(function (el) {
            el.setAttribute("aria-hidden", true);
        });
        // Erasing the token
        sessionStorage.clear();
    });
};