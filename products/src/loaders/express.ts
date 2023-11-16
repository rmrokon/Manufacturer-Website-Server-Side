import express from "express";
import cors from "cors";
import Routes from "../api";

async function createServer(){
    const app = express();

    app.use([
        cors({
            origin: true,
            credentials: true,
        }),
        express.json()
    ])

    app.options('*', cors({
        origin: true,
        credentials: true,
    }));

    app.use("/v1", Routes());
    
    app.get('/', (req, res) => {
        res.send("Hello from product service")
    })

    return app;
}

export default createServer;