import multer from "multer";

//1. Configuration du moteur de stockage de Multer
//Définition d'où et comment les fichiers téléchargés sont enregistrés.
const storage = multer.diskStorage({
    //Déterminer le dossier destination des fichiers.
    destination: (req, file, cb) => {
        //cb(erreur, chemin_du_dossier) null: il n'y a pas d'erreur, 'uploads/': le dossier cible
        cb(null, 'uploads/')
    },
    //Détermination le nom du fichier enregistré.
    filename: (req, file, cb) => {
        //Génération un nom unique composé du timestamp et du nom d'origine
        const uniqueName = `${Date.now()}-${file.originalname}`
        cb(null, uniqueName)
    }
})

export const upload = multer({storage})