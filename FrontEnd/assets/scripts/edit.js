import { URI } from "./script.js";
import { displayProjects } from "./gallery.js";
import { displayProjectsInModal } from "./modal.js";

// Deleting projects function
export async function deleteProjects(event) {
    // Retrieving the token
    const authToken = sessionStorage.getItem("token");
    // Retrieving the project ID
    const projectID = event.target.dataset.id;
    // Remove the event listener
    event.target.removeEventListener;
    // Calling the fetch function
    const deleteProject = await fetch(`${URI}works/${projectID}`, {
        method: `DELETE`,
        headers: { Authorization: `Bearer ${authToken}` },
    });
    if (deleteProject.status === 204) {
        // Validation message
        document.querySelector(`.error-message`).innerText = ``;
        document.querySelector(`.validation-message`).innerText = `Le projet a bien été supprimé`;
        updateGalleries();
    } else {
        // Error message
        document.querySelector(`.validation-message`).innerText = ``;
        document.querySelector(`.error-message`).innerText = `Erreur n°${deleteProject.status} lors de la suppression du projet`;
    };
};

// Adding projects function
export function addingProjects() {
    // Retrieving the form and inputs
    const addProjectForm = document.getElementById(`adding-project-form`);
    const imageInput = document.getElementById(`image-input`);
    const imageBox = document.getElementById(`image-box`);
    const titleInput = document.getElementById(`title-input`);
    const categoryInput = document.getElementById(`category-input`);
    const addProjectButton = document.querySelector(`input[value="Valider"]`);
    const imageBoxOrigin = imageBox.innerHTML;
    // Retrieving the token
    const authToken = sessionStorage.getItem("token");
    // Adding the image preview
    imageInput.addEventListener(`change`, function (event) {
        imageBox.innerHTML = ``;
        const previewImage = document.createElement(`img`);
        imageBox.appendChild(previewImage);
        previewImage.alt = `preview-image`;
        previewImage.classList.add(`preview-image`);
        previewImage.src = URL.createObjectURL(event.target.files[0]);
    });
    // Adding the eventListener if the form is completed
    addProjectForm.addEventListener(`change`, function () {
        if (imageInput.value !== `` && titleInput.value !== `` && categoryInput.value !== ``) {
            addProjectButton.classList.remove(`unvalid-form`);
            addProjectButton.addEventListener(`click`, async function (event) {
                // Creation of the FormData object
                const newProject = new FormData();
                newProject.append(`image`, imageInput.files[0]);
                newProject.append(`title`, titleInput.value);
                newProject.append(`category`, categoryInput.value);
                // Calling the fetch function
                const sendingProject = await fetch(`${URI}works`, {
                    method: `POST`,
                    headers: { Authorization: `Bearer ${authToken}` },
                    body: newProject
                });
                // Processing the API response
                if (sendingProject.status === 201) {
                    document.querySelector(`.error-message1`).innerText = ``;
                    document.querySelector(`.validation-message1`).innerText = `Le projet a bien été ajouté`;
                    updateGalleries();
                } else if (sendingProject.status !== 201) {
                    // Error message
                    document.querySelector(`.validation-message1`).innerText = ``;
                    document.querySelector(`.error-message1`).innerText = `Erreur n°${sendingProject.status} lors de l'ajout du projet`;
                };
            });
        } else {
            addProjectButton.classList.add(`unvalid-form`);
            addProjectButton.removeEventListener;
        };
    });
};

// Updating the galleries after delete or add project
async function updateGalleries() {
    // Retrieving the galleries
    const gallery = document.querySelector(`.gallery`);
    const modalGallery = document.querySelector(`.edition-modal--box__gallery`);
    // Retrieving updated works from the API
    const reponseWorks = await fetch(`${URI}works`);
    const projects = await reponseWorks.json();
    // Clear the galleries
    gallery.innerHTML = ``;
    modalGallery.innerHTML = ``;
    // Fill the galleries with updated works
    displayProjects(projects);
    displayProjectsInModal(projects);
};