require('babel-polyfill');
import mongoose from 'mongoose';

const database = {}

database.connect = async () => {
    //CHANGE URI WITH ENV VARIABLE
    const db = process.env.DB_NAME || 'ewsProto';
    mongoose.connect('mongodb://'+process.env.DB_HOST+'/'+db,{ useCreateIndex: true, useNewUrlParser: true })
    
    const connection = mongoose.connection

    connection.once('open',() => {
    console.log("connected to db")
    })
}

export default database