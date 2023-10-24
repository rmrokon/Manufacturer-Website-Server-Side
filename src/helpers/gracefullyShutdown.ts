const { Server } = require("http");
const { closeDbConnection } = require("../loaders/mongoose")

function graceFullyShutdown(signal: string, server: typeof Server){
    return process.on(signal, ()=>{
        closeDbConnection();
        console.log("✔ Closed database connection.");
        server.close();
        console.log("✔ Closed server connection.");
        process.exit(0);
    })
}

module.exports = graceFullyShutdown;