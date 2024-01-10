import { displayProjects } from "./gallery.js"

// Récupération des travaux sur l'API
const reponseWorks = await fetch('http://localhost:5678/api/works')
const projects = await reponseWorks.json()

// Fonction ajout des boutons filtres
export function addFiltersButtons(categories) {
    // Initialisation de l'index
    let i = 0
    // Création, rattachement et remplissage du bouton réunissant tous les filtres (ou qui réinitialise la liste)
    const sectionFilters = document.querySelector(".filters")
    const buttonAll = document.createElement("button")
    sectionFilters.appendChild(buttonAll)
    buttonAll.innerText = "Tous"
    buttonAll.classList.add("selected-filter")
    // Création, rattachement et remplissage des boutons filtres
    for (i in categories) {
        const filtersButtons = document.createElement("button")
        sectionFilters.appendChild(filtersButtons)
        filtersButtons.innerText = categories[i].name
    }
}

export function filters() {
    // Récupération des boutons filtres
    const filtersButtons = document.querySelectorAll(".filters button")
    const buttonAll = filtersButtons[0]
    const buttonObjects = filtersButtons[1]
    const buttonApartments = filtersButtons[2]
    const buttonHotelsRestaurants = filtersButtons[3]
    // Bouton "Tous"
    buttonAll.addEventListener("click", function () {
        buttonAll.classList.add("selected-filter")
        buttonObjects.classList.remove("selected-filter")
        buttonApartments.classList.remove("selected-filter")
        buttonHotelsRestaurants.classList.remove("selected-filter")
        document.querySelector(".gallery").innerHTML = ""
        displayProjects(projects)
    })
    // Bouton "Objets"
    buttonObjects.addEventListener("click", function () {
        const objects = projects.filter(function (project) {
            return project.categoryId === 1
        })
        buttonObjects.classList.add("selected-filter")
        buttonAll.classList.remove("selected-filter")
        buttonApartments.classList.remove("selected-filter")
        buttonHotelsRestaurants.classList.remove("selected-filter")
        document.querySelector(".gallery").innerHTML = ""
        displayProjects(objects)
    })
    // Bouton "Appartements"
    buttonApartments.addEventListener("click", function () {
        const apartments = projects.filter(function (project) {
            return project.categoryId === 2
        })
        buttonApartments.classList.add("selected-filter")
        buttonAll.classList.remove("selected-filter")
        buttonObjects.classList.remove("selected-filter")
        buttonHotelsRestaurants.classList.remove("selected-filter")
        document.querySelector(".gallery").innerHTML = ""
        displayProjects(apartments)
    })
    // Bouton "Hôtels & restaurants"
    buttonHotelsRestaurants.addEventListener("click", function () {
        const hotelsRestaurants = projects.filter(function (project) {
            return project.categoryId === 3
        })
        buttonHotelsRestaurants.classList.add("selected-filter")
        buttonAll.classList.remove("selected-filter")
        buttonObjects.classList.remove("selected-filter")
        buttonApartments.classList.remove("selected-filter")
        document.querySelector(".gallery").innerHTML = ""
        displayProjects(hotelsRestaurants)
    })
}
