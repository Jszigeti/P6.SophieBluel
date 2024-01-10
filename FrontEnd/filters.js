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
    // Récupération des boutons filtres
    const filtersButtons = document.querySelectorAll(".filters button")
    buttonAll = filtersButtons[0]
    const buttonObjects = filtersButtons[1]
    const buttonApartments = filtersButtons[2]
    const buttonHotelsRestaurants = filtersButtons[3]
}