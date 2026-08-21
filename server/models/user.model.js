import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    userName: {type: String},
    email: {type: String, lowercase: true, trim:true},
    profilePicture: {type: String},
    password: {type: String, trim:true},
    role: {type: String, required:true, default:'user'},
    isActive: {type: Boolean, default:false},
    token: {type: String}
}, {timestamps:true})

const User = mongoose.model('users', profileSchema)
export default User