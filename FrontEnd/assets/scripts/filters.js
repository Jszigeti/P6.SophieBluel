import { displayProjects } from './gallery.js';
import { URI } from './script.js';

// Filter buttons adding function
export function addFiltersButtons(categories) {
    // Initializing the index
    let i = 0;
    // Creating, attaching and filling the button resetting the filters
    const sectionFilters = document.querySelector(`.filters`);
    const buttonAll = document.createElement(`button`);
    sectionFilters.appendChild(buttonAll);
    buttonAll.innerText = `Tous`;
    buttonAll.classList.add(`selected-filter`);
    // Creating, attaching and filling filter buttons
    for (i in categories) {
        const filtersButtons = document.createElement(`button`);
        sectionFilters.appendChild(filtersButtons);
        filtersButtons.innerText = categories[i].name;
    };
};

// Filter function
export function filters() {
    // Retrieving filter buttons
    const filtersButtons = document.querySelectorAll(`.filters button`);
    const buttonAll = filtersButtons[0];
    const buttonObjects = filtersButtons[1];
    const buttonApartments = filtersButtons[2];
    const buttonHotelsRestaurants = filtersButtons[3];
    // Button "All"
    buttonAll.addEventListener(`click`, async function () {
        // Updating works from the API
        const reponseWorks = await fetch(`${URI}works`);
        const projects = await reponseWorks.json();
        // Change active filter bg's color
        buttonAll.classList.add(`selected-filter`);
        buttonObjects.classList.remove(`selected-filter`);
        buttonApartments.classList.remove(`selected-filter`);
        buttonHotelsRestaurants.classList.remove(`selected-filter`);
        // Updating the gallery
        document.querySelector(`.gallery`).innerHTML = ``;
        displayProjects(projects);
    });
    // Button "Objects"
    buttonObjects.addEventListener(`click`, async function () {
        // Updating works from the API
        const reponseWorks = await fetch(`${URI}works`);
        const projects = await reponseWorks.json();
        // Array filter
        const objects = projects.filter(function (project) {
            return project.category.name === buttonObjects.innerText;
        });
        // Change active filter bg's color
        buttonObjects.classList.add(`selected-filter`);
        buttonAll.classList.remove(`selected-filter`);
        buttonApartments.classList.remove(`selected-filter`);
        buttonHotelsRestaurants.classList.remove(`selected-filter`);
        // Updating the gallery
        document.querySelector(`.gallery`).innerHTML = ``;
        displayProjects(objects);
    });
    // Button "Apartments"
    buttonApartments.addEventListener(`click`, async function () {
        // Updating works from the API
        const reponseWorks = await fetch(`${URI}works`);
        const projects = await reponseWorks.json();
        // Array filter
        const apartments = projects.filter(function (project) {
            return project.category.name === buttonApartments.innerText;
        });
        // Change active filter bg's color
        buttonApartments.classList.add(`selected-filter`);
        buttonAll.classList.remove(`selected-filter`);
        buttonObjects.classList.remove(`selected-filter`);
        buttonHotelsRestaurants.classList.remove(`selected-filter`);
        // Updating the gallery
        document.querySelector(`.gallery`).innerHTML = ``;
        displayProjects(apartments);
    });
    // Button "Hotels & restaurants"
    buttonHotelsRestaurants.addEventListener(`click`, async function () {
        // Updating works from the API
        const reponseWorks = await fetch(`${URI}works`);
        const projects = await reponseWorks.json();
        // Array filter
        const hotelsRestaurants = projects.filter(function (project) {
            return project.category.name === buttonHotelsRestaurants.innerText;
        });
        // Change active filter bg's color
        buttonHotelsRestaurants.classList.add(`selected-filter`);
        buttonAll.classList.remove(`selected-filter`);
        buttonObjects.classList.remove(`selected-filter`);
        buttonApartments.classList.remove(`selected-filter`);
        // Updating the gallery
        document.querySelector(`.gallery`).innerHTML = ``;
        displayProjects(hotelsRestaurants);
    });
};