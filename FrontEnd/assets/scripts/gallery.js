// Fonction affichage des projets
export function displayProjects(projects) {
    // Initialisation de l'index
    let i = 0
    for (i in projects) {
        // Récupération de l'élément du DOM qui accueillera les projets
        const sectionGallery = document.querySelector(".gallery")
        // Création d'une balise dédiée à un projet
        const project = document.createElement("figure")
        // Création des balises
        const projectImage = document.createElement("img")
        const projectTitle = document.createElement("figcaption")
        // Rattachement des balises
        sectionGallery.appendChild(project)
        project.appendChild(projectImage)
        project.appendChild(projectTitle)
        // Remplissage des balises
        projectImage.src = projects[i].imageUrl
        projectImage.alt = projects[i].title
        projectTitle.innerText = projects[i].title
    }
}