// Projects display function
export function displayProjects(projects) {
    // Initializing the index
    let i = 0;
    for (i in projects) {
        // Retrieving the DOM element that will host the projects
        const sectionGallery = document.querySelector(`.gallery`);
        // Creating a HTML element dedicated to one project
        const project = document.createElement(`figure`);
        // Creating HTML elements
        const projectImage = document.createElement(`img`);
        const projectTitle = document.createElement(`figcaption`);
        // Attaching HTML elements
        sectionGallery.appendChild(project);
        project.appendChild(projectImage);
        project.appendChild(projectTitle);
        // Filling HTML elements
        projectImage.src = projects[i].imageUrl;
        projectImage.alt = projects[i].title;
        projectTitle.innerText = projects[i].title;
    };
};