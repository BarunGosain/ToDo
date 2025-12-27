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
const allowedOrigins = [
  "http://localhost:8080",
  "https://to-do-track-pi.vercel.app"
];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS blocked"));
    }
  },
  methods:["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
// app.use(cors({
//     origin:['https://to-do-track-pi.vercel.app'],
//     methods:["GET", "POST", "PUT", "DELETE"],
//     credentials: true
// }));
app.use(bodyParser.json());

// Connect to MongoDB
console.log("env mongodb url: ", process.env.MONGO_URI);
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log('Connected to MongoDB');
// }).catch(err => {
//     console.error('Error connecting to MongoDB', err);
// });

//103.155.194.122/32

// mongoose.connect("mongodb+srv://barungosain:Bg21182114@cluster0.joiqc.mongodb.net/todolistDB_dev").then(() => {
//     console.log('Connected to MongoDB');
// }).catch(err => {
//     console.error('Error connecting to MongoDB', err);
// });

mongoose.connect(process.env.MONGO_URI, {
  dbName: "todolistDB_dev"
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

// Routes
app.use('/api/todos', todosRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));