import express from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

import User from '../models/user.model.js';
import { upload } from '../middleware/storage.js';

const router = express.Router()

router.post('/register', upload.single('profilePicture'), async(req,res) => {
    try {
        //Extraction des données du formulaire register en front
        const {firstName, lastName, userName, email, password, role} = req.body

        const user = await User.findOne({email})
        if (user) {
            return res.status(400).json({message:'Cet utilisateur existe déjà'})
        }

        const hash = await bcrypt.hash(password, 10)

        //Récupération des fichiers téléchargé et des noms générés par Multer
        const imageFile = req.file
        const fileName = imageFile ? imageFile.filename : null

        //Génération d'un token nique est aléatoire de 32 octets converti en hexa, utilisé pour la vérification du mail
        const token = crypto.randomBytes(32).toString('hex')

        await User.create({firstName, lastName, userName, email, password:hash, profilePicture:fileName, token})

        const url = `http://localhost:5173/verify-email?token=${token}`
        

    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})

export default router