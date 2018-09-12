import { createContainer, asValue, asFunction } from 'awilix';
const app = require('./application');
const server = () => "servertest"
const container = createContainer();

container
    .register({
        app: asFunction(app).singleton(),
        server: asFunction(server).singleton()
    })

module.exports = container