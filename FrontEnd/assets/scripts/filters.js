import { displayProjects } from `./gallery.js`;
import { projects } from `./script.js`;

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

export function filters() {
    // Retrieving filter buttons
    const filtersButtons = document.querySelectorAll(`.filters button`);
    const buttonAll = filtersButtons[0];
    const buttonObjects = filtersButtons[1];
    const buttonApartments = filtersButtons[2];
    const buttonHotelsRestaurants = filtersButtons[3];
    // Button "All"
    buttonAll.addEventListener(`click`, function () {
        buttonAll.classList.add(`selected-filter`);
        buttonObjects.classList.remove(`selected-filter`);
        buttonApartments.classList.remove(`selected-filter`);
        buttonHotelsRestaurants.classList.remove(`selected-filter`);
        document.querySelector(`.gallery`).innerHTML = ``;
        displayProjects(projects);
    });
    // Button "Objects"
    buttonObjects.addEventListener(`click`, function () {
        const objects = projects.filter(function (project) {
            return project.category.name === buttonObjects.innerText;
        });
        buttonObjects.classList.add(`selected-filter`);
        buttonAll.classList.remove(`selected-filter`);
        buttonApartments.classList.remove(`selected-filter`);
        buttonHotelsRestaurants.classList.remove(`selected-filter`);
        document.querySelector(`.gallery`).innerHTML = ``;
        displayProjects(objects);
    });
    // Button "Apartments"
    buttonApartments.addEventListener(`click`, function () {
        const apartments = projects.filter(function (project) {
            return project.category.name === buttonApartments.innerText;
        });
        buttonApartments.classList.add(`selected-filter`);
        buttonAll.classList.remove(`selected-filter`);
        buttonObjects.classList.remove(`selected-filter`);
        buttonHotelsRestaurants.classList.remove(`selected-filter`);
        document.querySelector(`.gallery`).innerHTML = ``;
        displayProjects(apartments);
    });
    // Button "Hotels & restaurants"
    buttonHotelsRestaurants.addEventListener(`click`, function () {
        const hotelsRestaurants = projects.filter(function (project) {
            return project.category.name === buttonHotelsRestaurants.innerText;
        });
        buttonHotelsRestaurants.classList.add(`selected-filter`);
        buttonAll.classList.remove(`selected-filter`);
        buttonObjects.classList.remove(`selected-filter`);
        buttonApartments.classList.remove(`selected-filter`);
        document.querySelector(`.gallery`).innerHTML = ``;
        displayProjects(hotelsRestaurants);
    });
};