import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    title: {type: String},
    resume: {type: String},
    email: {type: String, lowercase: true, trim:true},
    phone: {type: String},
    permis: {type: String},
    githubUrl: {type: String},
    linkedinUrl: {type: String},
    profilePicture: {type: String},
    password: {type: String, trim:true},
    role: {type: String, required:true, default:'user'},
    isActive: {type: Boolean, default:false},
    token: {type: String}
}, {timestamps:true})

const Profile = mongoose.model('profile', profileSchema)
export default Profile