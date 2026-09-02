import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstName: {type: String, required:true},
    lastName: {type: String, required:true},
    userName: {type: String},
    email: {type: String, required:true, lowercase: true, trim:true},
    profilePicture: {type: String},
    password: {type: String, required:true, trim:true},
    role: {type: String, required:true, default:'user'},
    isActive: {type: Boolean, default:false},
    token: {type: String}
}, {timestamps:true})

const User = mongoose.model('users', userSchema)
export default User