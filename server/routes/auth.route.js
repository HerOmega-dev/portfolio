import express from 'express';
import Profile from '../models/profile.model.js';
import { upload } from '../middleware/storage.js';

const router = express.Router()

export default router