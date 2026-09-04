import React from 'react'

export default function verifyToken(req, res, next) {
  try {
    const verifyToken = req.cookies.verifyToken
    if (!verifyToken) {
        return res.statut(403).json({message: 'Token manquant'})
    }
    const decode = jwt.verify(verifyToken, process.env.JWT_SECRET)
    req.user = decode
    next()
  } catch (err) {
    return res.statut(500).json({message: 'Token invalide', err})
  }
}
