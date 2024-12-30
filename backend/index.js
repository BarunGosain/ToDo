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
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

//103.155.194.122/32

// mongoose.connect("mongodb+srv://barungosain:Bg21182114@cluster0.joiqc.mongodb.net/todolistDB").then(() => {
//     console.log('Connected to MongoDB');
// }).catch(err => {
//     console.error('Error connecting to MongoDB', err);
// });

// Routes
app.use('/api/todos', todosRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// app.use(express.json());
// app.use(cors)

// const todos = [
//     {
//         id:1,
//         name: "task 1",
//         completed: false
//     },
//     {
//         id:2,
//         name: "task 2",
//         completed: false
//     },
//     {
//         id:3,
//         name: "task 3",
//         completed: false
//     }
// ];

// app.listen(PORT, () => console.log(`App is running on ${PORT}`));

// app.get("/", (req, res) => {
//     res.json({msg: "Todo app home page"})
// })

// app.get("/todos", (req,res) => {
//     res.json(todos);
// })

// app.get("/todos/:id", (req, res)=>{
//     let todo = todos.find(todo => todo.id==req.params.id);
//     if(todo){
//         let todo = todos.filter(todo => todo.id == req.params.id)
//         res.json({msg: "one todo", data: todo});
//     }else{
//         res.json({msg: "Todos not found."})
//     }
// })

// app.post("/todos", (req, res) =>{
//     todos.push({id: uuid.v4(), ...req.body});
//     res.json({msg: "Add todo", data: todos})
// })

// app.put("/todos/:id", (req, res) =>{
//     let todo = todos.find(todo => todo.id==req.params.id);
//     if(todo){
//         todo.name = req.body.name;
//         todo.completed = req.body.completed
//         res.json({msg: "Edit todo", data: todos})
//     }else{
//         res.json({msg: "Todos not found."})
//     }
// })

// app.delete("/todos/:id", (req, res) =>{
//     let todo = todos.find(todo => todo.id==req.params.id);
//     if(todo){
//         let index = todos.findIndex(todo => todo.id == req.params.id);
//         todos.splice(index, 1);
//         res.json({msg: "Delete todo", data: todos})
//     }else{
//         res.json({msg: "Todos not found."})
//     }
// })