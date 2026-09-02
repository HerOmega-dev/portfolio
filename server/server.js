import express from 'express'
const server = express()

import dns from 'dns'
dns.setServers(["1.1.1.1"])

import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoute from './routes/auth.route.js' //Penser à rajouter l'extension après l'auto-complétion

const PORT = process.env.PORT || 3001

server.use(express.json())
server.use(cors({
    origin: process.env.FRONT_URL,
    credentials: true
})) //Le cors doit aller avant les use pour communiquer
server.use(cookieParser())
server.use('', authRoute)

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('connexion établie')
    server.listen(PORT, () => {
        console.log(`server on sur ${PORT}`)
    })
})
.catch (err => {
    console.log({message:'Erreur mongoose.connect', err})
})