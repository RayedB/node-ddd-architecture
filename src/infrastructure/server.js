require("babel-polyfill")
require('dotenv').config({path: __dirname+"/../../.env"})

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import boom from 'express-boom';
import database from './database/database';
import routes from './routes';

const server = {}

const port = process.env.port || 3000

server.launch = async () => {
    // Database
    await database.connect()
    // Middlewares
    const app = express();
    app.use(cors());
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(boom());

    // Routes
    app.use(routes);
    app.listen(port, ()=> {
        console.log("launched on " + port);
    })
    
}


export default server;