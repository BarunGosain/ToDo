const express = require('express');
const Todo = require('../models/Todo.model');

const router = express.Router();

// Create a new todo
router.post('/', async (req, res) => {
    try{

        const { text } = req.body;
        const todo = new Todo({
            text,
        });
        const savedTodo = await todo.save();
        res.status(201).json(savedTodo);

    }catch(err){
        res.status(500).json({ error: 'Failed to create todo', details: err });
    }
});

// Get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch todos', details: err });
    }
});

// Update a todo
router.put('/:id', async (req, res) => {
    try {
        const { text, status } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { text, status, editedDate: new Date() },
            { new: true }
        );
        res.status(200).json({ message:'Record updated successfully', data: updatedTodo}); 
    } catch (err) {
        res.status(500).json({ error: 'Failed to update todo', details: err });
    }
});


// Delete a todo
router.delete('/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete todo', details: err });
    }
});

module.exports = router;

