import express from "express";
import cors from "cors";

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
    
    app.get('/', (req, res) => {
        res.send("Smart Drilling server is running")
    })

    return app;
}

export default createServer;