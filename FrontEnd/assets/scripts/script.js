// Import from other JS files
import { displayProjects } from `./gallery.js`;
import { addFiltersButtons, filters } from `./filters.js`;
import { login } from `./login.js`;

export const URI = `http://localhost:5678/api/`;

// Retrieving works from the API
const reponseWorks = await fetch(`${URI}works`);
export const projects = await reponseWorks.json();

// Retrieving works categories from the API
const reponseCategories = await fetch(`${URI}categories`);
const categories = await reponseCategories.json();

// Calling functions relating only to the homepage
if (document.querySelector(`body`).classList.value === `index`) {
   addFiltersButtons(categories);
    displayProjects(projects);
    filters(); 
};

// Calling functions relating only to the login page
if (document.querySelector(`body`).classList.value === `login-page`) {
    login();
};
