import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String, required: true },
    hash: {type: String, required: true },
    verification_token: {type: String, required: true },
    verified: {type: String, required: true, default: false },

})
const User = mongoose.model('User',userSchema);

module.exports = User;