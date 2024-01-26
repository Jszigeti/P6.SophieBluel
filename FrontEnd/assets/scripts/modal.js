import { deleteProjects } from "./edit.js";

// Edit mode display function
export function displayEditMode() {
    if (window.sessionStorage.token) {
        const editionBanner = document.querySelector(`.edition-banner`).classList.add(`connected`);
        const header = document.querySelector(`.index header`).classList.add(`edition-header`);
        const loginButton = document.querySelector(`a[href="./login.html"]`).style.display = "none";
        const logoutButton = document.querySelector(`.logout-button`).classList.add(`connected`);
        const editionButton = document.querySelector(`.edition-button`).classList.add(`connected`);
        const hiddenElements = Array.from(document.querySelectorAll(`.connected`));
        hiddenElements.forEach(function (el) {
            el.removeAttribute("aria-hidden");
        });
    }
}

// Modal display function
export function displayModal() {
    if (window.sessionStorage.token) {
        const modal = document.querySelector(`.edition-modal`);
        const openModalButton = document.querySelector(`.edition-button`);
        // Opening the modal
        openModalButton.addEventListener(`click`, function () {
            modal.classList.add(`connected`);
        });
        // Closing the modal by clicking outside its window
        window.addEventListener(`click`, function (event) {
            if (event.target == modal && modal.classList.contains(`connected`)) {
                modal.classList.remove(`connected`);
            }
        });
        // Closing the modal by pressing the escape key
        window.addEventListener(`keydown`, function (event) {
            if (event.key === `Escape` || event.key === `Esc`) {
                modal.classList.remove(`connected`);
            }
        });
        // Closing the modal by clicking the x icon
        const closeModalButton = document.querySelector(`#closing-icon`);
        closeModalButton.addEventListener(`click`, function () {
            modal.classList.remove(`connected`);
        });
        // Closing the modal by clicking the x icon
        const closeModalButton2 = document.querySelector(`#closing-icon2`);
        closeModalButton2.addEventListener(`click`, function () {
            modal.classList.remove(`connected`);
        });
    }
}

// Projects in modal display function
export function displayProjectsInModal(projects) {
    // Initializing the index
    let i = 0;
    for (i in projects) {
        // Retrieving the DOM element that will host the projects
        const modalGallery = document.querySelector(`.edition-modal--box__gallery`);
        // Creating a HTML element dedicated to one project
        const project = document.createElement(`figure`);
        // Creating HTML elements
        const projectImage = document.createElement(`img`);
        const deleteBlock = document.createElement(`div`);
        const deleteIcon = document.createElement(`img`);
        // Attaching HTML elements
        modalGallery.appendChild(project);
        project.appendChild(projectImage);
        project.appendChild(deleteBlock);
        deleteBlock.appendChild(deleteIcon);
        // Filling HTML elements
        projectImage.src = projects[i].imageUrl;
        projectImage.alt = projects[i].title;
        projectImage.dataset.id = projects[i].id;
        deleteBlock.classList.add(`delete-block`);
        deleteIcon.classList.add(`delete-icon`);
        deleteIcon.src = `./assets/icons/trash-can-solid.svg`;
        // Adding event listeners on every project
        project.addEventListener(`click`, deleteProjects);
    }
}

// Modal page change function
export function modalPageChange() {
    const addPhotosButton = document.querySelector(`input[value="Ajouter une photo"]`);
    const previouslyIcon = document.getElementById(`previously-icon`);
    const deleteProjectsPage = document.getElementById(`delete-projects-page`);
    const addProjectsPage = document.getElementById(`add-projects-page`);
    addPhotosButton.addEventListener(`click`, function() {
        deleteProjectsPage.style.display = `none`;
        addProjectsPage.style.display = `flex`;
    });
    previouslyIcon.addEventListener(`click`, function() {
        deleteProjectsPage.style.display = `flex`;
        addProjectsPage.style.display = `none`;
    });
};

// Retrieving the categories from the API to display in modal function
export function addingFormCategories(categories) {
    let i = 0;
    for (i in categories) {
        const categoriesInput = document.getElementById(`category-input`)
        const category = document.createElement(`option`);
        category.innerText = categories[i].name;
        category.value = categories[i].id;
        categoriesInput.appendChild(category);
    }
};