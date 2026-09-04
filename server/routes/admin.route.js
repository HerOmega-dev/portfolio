import express from "express";
import User from "../models/user.model.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router()

//============
// ROUTE ESPACE ADMIN (PROTEGE + FILTRE ROLE)
//============

router.get('/admin', verifyToken, async (req,res) => {
    try {
        //1. Middleware verifyToken OK
        //2. Vérification par role
        if (req.user.role !== 'admin') {
            return res.status(403).json({message: 'Acces refusé'})
        }

        const user = await User.find()
        return res.status(200).json(user)
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})