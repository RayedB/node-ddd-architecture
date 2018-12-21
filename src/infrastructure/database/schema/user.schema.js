import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String, required: true, unique: true },
    hash: {type: String, required: true },
    verified: {type: Boolean, required: true, default: false },
    passwordResetToken: String,
    passwordResetExpires: Date
    },
    {timestamps: true},
)
const User = mongoose.model('User',userSchema);

module.exports = User;