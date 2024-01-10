// Fonction ajout des boutons filtres
export function addFiltersButtons() {
    // Création et rattachement des balises
    for (let i = 0; i < 4; i++) {
        const sectionFilters = document.querySelector(".filters")
        const filtersButtons = document.createElement("button")
        sectionFilters.appendChild(filtersButtons)
    }
    // Récupération des boutons filtres
    const filtersButtons = document.querySelectorAll(".filters button")
    const buttonAll = filtersButtons[0]
    const buttonObjects = filtersButtons[1]
    const buttonApartments = filtersButtons[2]
    const buttonHotelsRestaurants = filtersButtons[3]
    // Ajout des innerText
    buttonAll.innerText = "Tous"
    buttonObjects.innerText = "Objets"
    buttonApartments.innerText = "Appartements"
    buttonHotelsRestaurants.innerText = "Hôtels & restaurants"
    // Ajout de classe pour le filtre sélectionné par défault
    buttonAll.classList.add("selected-filter")
}