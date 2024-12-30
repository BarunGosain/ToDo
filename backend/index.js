require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
require('dotenv').config();
// const uuid = require("uuid");
const todosRoutes = require('./routes/todos');

const app = express();

// Middleware
app.use(cors({
    origin:['https://to-do-track-pi.vercel.app'],
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(bodyParser.json());

// Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log('Connected to MongoDB');
// }).catch(err => {
//     console.error('Error connecting to MongoDB', err);
// });

//103.155.194.122/32

mongoose.connect("mongodb+srv://barungosain:Bg21182114@cluster0.joiqc.mongodb.net/todolistDB").then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

// Routes
app.use('/api/todos', todosRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));