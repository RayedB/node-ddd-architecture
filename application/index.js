/**
 * Starting point of our infrastructure
 * Dependency injection through Awilix sending parameters to connect to DB and start server
 */


module.exports = ({server}) => {
    console.log(server)
    return {
      start: () =>
        Promise
          .resolve()
        //   .then(database.authenticate)
        //   .then(server.start)
    }
  }