const { closeDbConnection } = require("../loaders/mongoose")

function graceFullyShutdown(signal, server){
    return process.on(signal, ()=>{
        closeDbConnection();
        console.log("✔ Closed database connection.");
        server.close();
        console.log("✔ Closed server connection.");
        process.exit(0);
    })
}

module.exports = graceFullyShutdown;