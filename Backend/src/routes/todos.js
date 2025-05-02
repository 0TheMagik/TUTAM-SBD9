const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// CREATE
router.post('/create', async (req, res) => {
    try {
        const todo = new Todo(req.body);
        const saved = await todo.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ error: 'Gagal membuat Todo list' });
    }
});

// READ ALL
router.get('/get', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: 'Gagal mengambil data' });
    }
});

// GET single todo
router.get('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        res.json(todo);
    } catch (err) {
        res.status(500).json({ error: 'Gagal mengambil data' });
    }
});

// UPDATE todo
router.put('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        res.json(todo);
    } catch (err) {
        res.status(500).json({ error: 'Gagal mengupdate Todo' });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: 'Todo dihapus' });
    } catch (err) {
        res.status(500).json({ error: 'Gagal menghapus Todo list' });
    }
});

module.exports = router;
