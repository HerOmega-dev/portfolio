import express from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';
import { upload } from '../middleware/storage.js';
import sendConfirmationEmail from '../middleware/sendConfirmationEmail.js';

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

        //URL de vérification avec token
        const url = `http://localhost:5173/verify-email?token=${token}`
        sendConfirmationEmail(email, url)

        res.status(201).json({message:'Utilisateur crée'})
        
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})

router.get('/verify-email', async(req, res) => {
    try {
        //Récupération du token depuis l'URL
        const {token} = req.query

        const user = await User.findOne({token})
        if (!user) {
            return res.status(400).json({message:"Bad request !"})
        } else {
            user.isActive = true
            await user.save()
            return res.json({message: 'Votre compte est activé'})
        }
    } catch (err) {
        return res.status(500).json({message:'Error server verify-email', err})
    }
})

router.post('/login', async(req, res) => {
    try {
        const {email, password} = req.body
        if (!email || !password) {
            return res.status(400).json({message: "Veuillez remplir tous les champs"})
        }

        const user = await user.findOne({email})
        if (!user) {
            return res.status(400).json({message: "Identifiants invalides"})
        }
        if (!user.isActive) {
            return res.status(401).json({message: "Activez votre compte"})
            //401 car l'utilisateur est reconnu mais pas autorisé
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({message: "Identifiants invalides"})
        }

        //Génération du Json Web Token, le payload contient les données non sensibles
        const userPayload = {id: user._id, email: user.email, role: user.role}
        const token = jwt.sign(
            userPayload,
            process.env.JWT_SECRET,
            {expiresIn: '2h'}
        )

        //Création et configuration du cookie sécurisé
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600 * 1000 * 2,
            sameSite: 'lax'
        })
    } catch (err) {
         
    }
})

export default router