require("babel-polyfill")
require('dotenv').config()

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import database from './database/database';
import routes from './routes';

const server = {}
const app = express();

server.launch = async () => {

    await database.connect()
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(cors());
    app.use(routes)
    app.listen(8080, ()=> {
        console.log("launched on 8080");
    })
    
}


export default server;