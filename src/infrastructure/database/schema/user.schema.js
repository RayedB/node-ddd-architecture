import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    // name: {type: String, required: true },
    email: {type: String, required: true },
    password: {type: String, required: true },
    // organisation: {
    //     name: ObjectId,
    //     position: String // TODO Switch to enum
    // }
})
const User = mongoose.model('User',userSchema);

module.exports = User;