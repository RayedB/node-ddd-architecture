import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema({
    code: {type: String, required: true },
    description: {
        fr: {type: String, required: true },
        en: {type: String, required: true },
    },
    origin: {type: String, required: true },
    measureUnit: {type: String, required: true },

})

module.exports = productSchema;