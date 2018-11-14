import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const supplierSchema = new Schema({
    name: String,
    address: String,
})

module.exports = supplierSchema;