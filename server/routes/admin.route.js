import express from "express";
import Profile from "../models/profile.model.js";
verifyToken

const router = express.Router()

//============
// ROUTE ESPACE ADMIN (PROTEGE + FILTRE ROLE)
//============

router.get('/admin', verifyToken, async (req,res) => {
    try {
        //1. Middleware verifyToken OK
        //2. Vérification par role
        if (req.profile.role !== 'admin') {
            return res.status(403).json({message: 'Acces refusé'})
        }

        const profile = await Profile.find()
        return res.status(200).json(profile)
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})