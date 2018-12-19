import server from './infrastructure/server'

const start = async () => {
    try {
        await server.launch()

    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}

start()