const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { options } = require('nodemon/lib/config');
const loaders = require('./loaders');
// const { loaders } = require('./loaders');
require('dotenv').config();

const {
    CLIENT_SECRET,
    PORT,
    JWT_SECRET,
    MONGO_URL,
    PROTOCOL,
    HOST,
    NODE_ENV
} = process.env;

if(
    !CLIENT_SECRET ||
    !PORT ||
    !JWT_SECRET ||
    !MONGO_URL ||
    !PROTOCOL ||
    !HOST || 
    !NODE_ENV
){
    throw new Error(
        `PORT, MONGO_URL, JWT_SECRET, CLIENT_SECRET these env must be set`
      ); 
}
const stripe = require('stripe')(CLIENT_SECRET);

const app = express();

const port = PORT || 5000;

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
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: "Forbidden Access" });
        }
        req.decoded = decoded;
        next();
    })
}

// Connect with DB
loaders.load({mongo_uri: MONGO_URL})
.then(()=>{
    console.log(`🚀 The server is running on ${PROTOCOL}://${HOST}:${PORT} on ${NODE_ENV} mode.`)
})

// const uri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASS}@cluster0.cui7v.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// async function run() {
//     try {
//         await client.connect();

//         const productsCollection = client.db("smart-drilling").collection("allproducts");
//         const reviewsCollection = client.db("smart-drilling").collection("reviews");
//         const userCollection = client.db("smart-drilling").collection("users");
//         const orderCollection = client.db("smart-drilling").collection("order");
//         const paymentsCollection = client.db("smart-drilling").collection("payments");

//         // Verify Admin

//         async function verifyAdmin(req, res, next) {
//             const requesterEmail = req.decoded.email;
//             const filter = { email: requesterEmail };
//             const requester = await userCollection.findOne(filter);

//             if (requester.role === 'Admin') {
//                 next();
//             }
//             else {
//                 res.status(403).send({ message: "Forbidden Access" })
//             }
//         }

//         // API for useAdmin hook

//         app.get("/admin/:email", async (req, res) => {
//             const email = req.params.email;
//             const filter = { email: email };
//             const user = await userCollection.findOne(filter);
//             const isAdmin = user?.role === "Admin";
//             res.send({ admin: isAdmin });
//         })


//         // Payment

//         app.post('/create-payment-intent', verifyJWT, async (req, res) => {
//             const { bill } = req.body;
//             const amount = bill * 100;

//             const paymentIntent = await stripe.paymentIntents.create({
//                 amount: amount,
//                 currency: "usd",
//                 payment_method_types: ['card']
//             });
//             res.send({
//                 clientSecret: paymentIntent.client_secret,
//             });
//         })

//         // Update Payments Collection
//         app.patch("/updatePayment/:id", verifyJWT, async (req, res) => {
//             const id = req.params.id;
//             const payment = req.body;
//             const filter = { _id: ObjectId(id) };
//             const updateDoc = {
//                 $set: {
//                     paid: true,
//                     transactionId: payment.transactionId
//                 },
//             };
//             const result = await paymentsCollection.insertOne(payment);
//             const order = await orderCollection.updateOne(filter, updateDoc);
//             res.send(result);
//         })

//         // 
//         app.delete("/product/delete/:id", verifyJWT, verifyAdmin, async (req, res) => {
//             const id = req.params.id;
//             const filter = { _id: ObjectId(id) };
//             const result = await productsCollection.deleteOne(filter);
//             res.send(result);
//         })
//         // User Creation
//         app.put("/users/:email", async (req, res) => {
//             const email = req.params.email;
//             const user = req.body;
//             const filter = { email: email };
//             const options = { upsert: true };

//             const updateDoc = {
//                 $set: user,
//             };

//             const result = await userCollection.updateOne(filter, updateDoc, options);
//             const token = jwt.sign({ email: email }, JWT_SECRET, {
//                 expiresIn: '30d'
//             });

//             res.send({ result, token });
//         })

//         // Get all user 

//         app.get("/allusers", verifyJWT, async (req, res) => {
//             const result = await userCollection.find().toArray();
//             res.send(result);
//         })

//         // Get User By Email

//         app.get("/getUserByEmail/:email", verifyJWT, async (req, res) => {
//             const email = req.params.email;
//             const filter = { email: email };
//             const user = await userCollection.findOne(filter);
//             res.send(user);
//         })
//         // Update a User

//         app.put("/updateAUser/:id", verifyJWT, async (req, res) => {
//             const id = req.params.id;
//             const { education, linkedin, city, phone, name } = req.body;
//             const filter = { _id: ObjectId(id) };
//             const options = { upsert: true };
//             const updatedUser = {
//                 $set: {
//                     name,
//                     education,
//                     linkedin,
//                     city,
//                     phone
//                 }
//             }
//             const result = await userCollection.updateOne(filter, updatedUser, options);
//             res.send(result);
//         })

//         // Delete an User

//         app.delete("/user/delete/:email", verifyJWT, verifyAdmin, async (req, res) => {
//             const email = req.params.email;
//             const filter = { email: email };
//             const result = await userCollection.deleteOne(filter);
//             res.send(result);
//         })

//         // Make a user Admin

//         app.put("/user/admin/:email", verifyJWT, verifyAdmin, async (req, res) => {
//             const email = req.params.email;
//             const filter = { email: email };
//             const updatedUser = {
//                 $set: {
//                     role: "Admin"
//                 }
//             }
//             const result = await userCollection.updateOne(filter, updatedUser);
//             res.send(result);
//         })

//         // Get all products

//         app.get("/allproducts", async (req, res) => {
//             const result = (await productsCollection.find().toArray()).reverse();
//             res.send(result);
//         })

//         // Get Products by ID

//         app.get("/product/:id", async (req, res) => {
//             const id = req.params.id;
//             const query = { _id: ObjectId(id) };
//             const product = await productsCollection.findOne(query);

//             res.send(product);
//         })

//         // Get a product by Name
//         app.get("/productByName/:name", async (req, res) => {
//             const name = req.params.name;
//             const filter = { name };
//             const product = await productsCollection.findOne(filter);
//             res.send(product);
//         })

//         // Update product quantity

//         app.patch("/updateQuantity", async (req, res) => {
//             const { newQuantity, _id } = req.body;
//             const filter = { _id: ObjectId(_id) }
//             const updateDoc = {
//                 $set: { quantity: newQuantity },
//             };

//             const result = await productsCollection.updateOne(filter, updateDoc);

//             res.send(result);
//         })

//         // Add a product

//         app.post("/addProduct", verifyJWT, verifyAdmin, async (req, res) => {
//             const product = req.body;
//             const result = await productsCollection.insertOne(product);
//             res.send(result);
//         })

//         // Get all orders
//         app.get("/orders", verifyJWT, verifyAdmin, async (req, res) => {
//             const orders = await orderCollection.find({}).toArray();
//             res.send(orders);
//         })

//         // Ship an Order 

//         app.put("/order/shipped/:id", verifyJWT, verifyAdmin, async (req, res) => {
//             const id = req.params.id;
//             const query = { _id: ObjectId(id) };
//             const updateDoc = {
//                 $set: { shipped: true }
//             }
//             const result = await orderCollection.updateOne(query, updateDoc);
//             res.send(result);
//         })


//         // Place an order

//         app.post("/placeOrder", verifyJWT, async (req, res) => {
//             const order = req.body;
//             const result = await orderCollection.insertOne(order);
//             res.send(result)
//         })

//         // Delete an Order

//         app.delete("/delete/:id", verifyJWT, async (req, res) => {
//             const id = req.params.id;
//             const filter = { _id: ObjectId(id) };
//             const result = await orderCollection.deleteOne(filter);
//             if (result.deletedCount === 1) {

//                 res.send(result);
//             }
//         })


//         // Get orders by email

//         app.get("/myorders/:email", async (req, res) => {
//             const email = req.params.email;
//             const filter = { email: email }
//             const ordersByEmail = await orderCollection.find(filter).toArray();
//             res.send(ordersByEmail)
//         })
//         // Get orders by id

//         app.get("/orderById/:id", verifyJWT, async (req, res) => {
//             const id = req.params.id;
//             const filter = { _id: ObjectId(id) };
//             const orderById = await orderCollection.findOne(filter);
//             res.send(orderById);
//         })

//         // Get all reviews

//         app.get("/reviews", async (req, res) => {
//             const result = await reviewsCollection.find().toArray();
//             res.send(result);
//         })

//         // Add a review

//         app.post("/addAReview", verifyJWT, async (req, res) => {
//             const clientReview = req.body;
//             const result = await reviewsCollection.insertOne(clientReview);
//             res.send(result);
//         })

//     }
//     finally {

//     }
// }
// run().catch(console.dir);