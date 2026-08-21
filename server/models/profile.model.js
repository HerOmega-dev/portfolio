import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    title: {type: String},
    resume: {type: String},
    phone: {type: String},
    driverLicense: {type: String},
    githubUrl: {type: String},
    linkedinUrl: {type: String},
}, {timestamps:true})

const Profile = mongoose.model('profiles', profileSchema)
export default Profile