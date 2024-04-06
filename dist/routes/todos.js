"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let todos = [];
router.get("/", (req, res) => {
    res.status(200).json({ todos });
});
router.post("/todo", (req, res) => {
    const body = req.body;
    const newToDo = {
        id: new Date().toISOString(),
        text: body.text,
    };
    todos.push(newToDo);
    res.status(201).json({ message: "Added to do" });
});
router.put("/todo/:todoId", (req, res, next) => {
    const todo = req.params;
    const body = req.body;
    const todoIndex = todos.findIndex((item) => item.id === todo.todoId);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
        return res.status(200).json({ message: "Updated todo" });
    }
    res.status(404).json({ message: "Couldn't find todo item" });
});
router.delete("/todo/:todoId", (req, res, next) => {
    const todo = req.params;
    todos = todos.filter((todoItem) => todoItem.id !== todo.todoId);
    res.status(200).json({ message: "Deleted todo" });
});
exports.default = router;
