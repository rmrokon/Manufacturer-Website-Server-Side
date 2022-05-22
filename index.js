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

// Verify JWT 
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    if (!authHeader) {
        res.status(401).send({ message: "Unauthorized access" });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: "Forbidden Access" });
        }
        req.decoded = decoded;
        next();
    })
}

// Connect with DB

const uri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASS}@cluster0.cui7v.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();

        const productsCollection = client.db("smart-drilling").collection("allproducts");
        const reviewsCollection = client.db("smart-drilling").collection("reviews");
        const userCollection = client.db("smart-drilling").collection("users");
        const orderCollection = client.db("smart-drilling").collection("order");

        // User Creation
        app.put("/users/:email", async (req, res) => {
            const email = req.params.email;
            const user = req.body;
            const filter = { email: email };
            const options = { upsert: true };

            const updateDoc = {
                $set: user,
            };

            const result = await userCollection.updateOne(filter, updateDoc, options);
            const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN, {
                expiresIn: '30d'
            });

            res.send({ result, token });
        })

        // Get all products

        app.get("/allproducts", async (req, res) => {
            const result = await productsCollection.find().toArray();
            res.send(result);
        })

        // Get Products by ID

        app.get("/product/:id", async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: ObjectId(id) };
            const product = await productsCollection.findOne(query);
            console.log(product);

            res.send(product);
        })

        // Get all orders



        // Place an order

        app.post("/placeOrder", verifyJWT, async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.send(result)
        })


        // Get orders by email

        app.get("/myorders/:email", async (req, res) => {
            const email = req.params.email;
            const filter = { email: email }
            const ordersByEmail = await orderCollection.find(filter).toArray();
            res.send(ordersByEmail)
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