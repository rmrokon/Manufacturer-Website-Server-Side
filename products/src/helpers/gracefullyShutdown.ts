import { closeDbConnection } from "../loaders/mongoose";
import {Server} from 'http'

function graceFullyShutdown(signal: string, server: Server){
    return process.on(signal, ()=>{
        closeDbConnection();
        console.log("✔ Closed database connection.");
        server.close();
        console.log("✔ Closed server connection.");
        process.exit(0);
    })
}

export default graceFullyShutdown;