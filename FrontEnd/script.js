// Import de la fonction d'affichage des projets depuis son fichier js
import { displayProjects } from "./gallery.js";

// Récupération des travaux sur l'API
const reponseWorks = await fetch('http://localhost:5678/api/works')
const projects = await reponseWorks.json()

displayProjects(projects)