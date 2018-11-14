import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const shipmentSchema = new Schema({
    shipmentNumber: {type: String, required: true },
    transportation: {type: String, required: true },
    invoice: {
        date: {type: Date, required: true },
        number: {type: String, required: true },
    },
    client: {
        name: String,
        address: String,
        city: String,
        zip: String,
        country: String,
        countryCode: String
    },
    items: [{
        sku: ObjectId,
        cases: Number,
        weightInGrams: Number,
    }]
    
})

module.exports = shipmentSchema;