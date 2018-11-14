import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    id: {type: String, required: true },
    name: {type: String, required: true },
    users: [ObjectId],
    location: {
        address: {type: String, required: true },
        addressExtension: {type: String, required: true },
        city: {type: String, required: true },
        zipcode: {type: String, required: true },
        country: {type: String, required: true },
    }
})

module.exports = organizationSchema;