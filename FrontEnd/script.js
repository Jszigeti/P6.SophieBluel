// Import de la fonction d'affichage des projets depuis son fichier js
import { displayProjects } from "./gallery.js"
import { addFiltersButtons } from "./filters.js"

// Récupération des travaux sur l'API
const reponseWorks = await fetch('http://localhost:5678/api/works')
const projects = await reponseWorks.json()

// Récupération des catégories de travaux sur l'API
const reponseCategories = await fetch('http://localhost:5678/api/categories')
const categories = await reponseCategories.json()

addFiltersButtons(categories)
displayProjects(projects)