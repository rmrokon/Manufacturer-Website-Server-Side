const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

// middleware
const corsConfig = {
    origin: true,
    credentials: true,
}
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Smart Drilling server is running")
})

app.listen(port, () => {
    console.log("Smart Drilling Server on PORT: ", port);
})


// Connect with DB

const uri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASS}@cluster0.cui7v.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();

        const productsCollection = client.db("smart-drilling").collection("allproducts");
        const reviewsCollection = client.db("smart-drilling").collection("reviews");

        // Get all products

        app.get("/allproducts", async (req, res) => {
            const result = await productsCollection.find().toArray();
            res.send(result);
        })

        // Get Products by ID

        app.get("/product/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const product = await productsCollection.findOne(query);

            res.send(product);
        })

        // Get all reviews

        app.get("/reviews", async (req, res) => {
            const result = await reviewsCollection.find().toArray();
            res.send(result);
        })

    }
    finally {

    }
}
run().catch(console.dir);