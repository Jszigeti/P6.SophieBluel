// Imports from other JS files
import { displayProjects } from './gallery.js';
import { addFiltersButtons, filters } from './filters.js';
import { login, logout } from './login.js';
import { displayEditMode, displayModal, displayProjectsInModal, modalPageChange, addingFormCategories } from './modal.js';
import { addingProjects } from './edit.js';

// Storing API's URI in a const
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
    logout();
    displayEditMode();
    displayModal();
    displayProjectsInModal(projects);
    modalPageChange();
    addingFormCategories(categories);
    addingProjects(projects);
};

// Calling functions relating only to the login page
if (document.querySelector(`body`).classList.value === `login-page`) {
    login();
};
