import { URI } from "./script.js";
import { displayProjects } from "./gallery.js";
import { displayProjectsInModal } from "./modal.js";

// Deleting projects function
export async function fetchDeleteProject(event) {
        // Initializing the index
        let i = 0;
        // Retrieving the modal and the projects' images
        const modal = document.querySelector(`.edition-modal`);
        const project = Array.from(document.querySelectorAll(`.edition-modal--box__gallery img`));
        // Retrieving the galleries
        const gallery = document.querySelector(`.gallery`);
        const modalGallery = document.querySelector(`.edition-modal--box__gallery`);
        // Retrieving the token
        const authToken = sessionStorage.getItem("token");
        const el = event.target;
        const projectID = el.closest(`figure`).dataset.id;
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
            // Retrieving updated works from the API
            const reponseWorks = await fetch(`${URI}works`);
            const projects = await reponseWorks.json();
            // Clear the galleries
            gallery.innerHTML = ``;
            modalGallery.innerHTML = ``;
            // Fill the galleries with updated works
            displayProjects(projects);
            displayProjectsInModal(projects);
        } else {
            // Error message
            document.querySelector(`.validation-message`).innerText = ``;
            document.querySelector(`.error-message`).innerText = `Erreur n°${deleteProject.status} lors de la suppression du projet`;
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
    };

// Adding projects function
export function addingProjects() {
    const imageInput = document.getElementById(`image-input`);
    const imageBox = document.getElementById(`image-box`);
    imageInput.addEventListener(`change`, function (event) {
        imageBox.innerHTML = ``;
        const previewImage = document.createElement(`img`);
        imageBox.appendChild(previewImage);
        previewImage.alt = `preview-image`;
        previewImage.classList.add(`preview-image`);
        previewImage.src = URL.createObjectURL(event.target.files[0]);
        clearPreviewingImage()
    })
    fetchNewProject();
}

function clearPreviewingImage() {
    const addProjectForm = document.getElementById(`adding-project-form`);
    const imageBox = document.getElementById(`image-box`);
    const imageBoxOrigin = imageBox.innerHTML;
    const imageInput = document.getElementById(`image-input`);
    const clearPreviewIcon = document.createElement(`img`);
    imageBox.appendChild(clearPreviewIcon);
    clearPreviewIcon.alt = `clear preview icon`;
    clearPreviewIcon.id = `clear-preview-icon`;
    clearPreviewIcon.src = `./assets/icons/xmark.svg`;
    clearPreviewIcon.addEventListener(`click`, function () {
        imageBox.innerHTML = imageBoxOrigin;
        addProjectForm.reset();
        addingProjects();
    })
}

function fetchNewProject() {
    const addProjectForm = document.getElementById(`adding-project-form`);
    const imageInput = document.getElementById(`image-input`);
    const titleInput = document.getElementById(`title-input`);
    const addProjectButton = document.querySelector(`input[value="Valider"]`);
    const categoryInput = document.getElementById(`category-input`);
    const authToken = sessionStorage.getItem("token");
    const imageBox = document.getElementById(`image-box`);
    const imageBoxOrigin = imageBox.innerHTML;
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
                    addProjectForm.reset();
                    imageBox.innerHTML = imageBoxOrigin;
                    imageInput.value = ``;
                    addingProjects();
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