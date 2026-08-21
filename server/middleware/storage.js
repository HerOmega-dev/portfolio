import multer from "multer";
import path from 'path'

//1. Configurer du moteur de stockage de Multer
//Définir d'où et comment les fichiers téléchargés sont enregistrés.
const storage = multer.diskStorage({
    //Déterminer le dossier destination des fichiers.
    destination: (req, file, cb) => {
        //cb(erreur, chemin_du_dossier) null: il n'y a pas d'erreur, 'uploads/': le dossier cible
        cb(null, 'uploads/')
    },
    //Déterminer le nom du fichier enregistré.
    filename: (req, file, cb) => {
        //Générer un nom unique composé du timestamp et du nom d'origine
        const uniqueName = `${Date.now()}-${file.originalname}`
        cb(null, uniqueName)
    }
})

export const upload = multer({storage})