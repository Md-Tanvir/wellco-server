const express = require("express");
const cors = require("cors");
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b0w5j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Wellco Server Is Running");
});


client.connect((err) => {
    const coursesCollection = client.db("wellco").collection("courses");
    const reviewsCollection = client.db("wellco").collection("reviews");
    // const ordersCollection = client.db("wellco").collection("orders");
    // const usersCollection = client.db("wellco").collection("users");
    const blogsCollection = client.db("wellco").collection("blogs");


    // GET ALL COURSES
    app.get("/courses", async (req, res) => {
      const result = await coursesCollection.find({}).toArray();
      res.send(result);
    });

    // GET ALL REVIEWS
    app.get("/reviews", async (req, res) => {
        const result = await reviewsCollection.find({}).toArray();
        res.send(result);
    });

    // GET ALL BLOGS
    app.get("/blogs", async (req, res) => {
        const result = await blogsCollection.find({}).toArray();
        res.send(result);
    });

});


app.listen(port, () => {
    console.log(`Server Is Running On Port:`, port);
  });