import { Router } from "express";
import { Todo } from "../models/todo";

const router = Router();

let todos: Todo[] = [];

router.get("/", (req, res) => {
  res.status(200).json({ todos });
});

router.post("/todo", (req, res) => {
  const newToDo: Todo = {
    id: new Date().toISOString(),
    text: req.body.text,
  };

  todos.push(newToDo);

  res.status(201).json({ message: "Added to do" });
});

router.put("/todo/:todoId", (req, res, next) => {
  const tid = req.params.todoId;
  const todoIndex = todos.findIndex((item) => item.id === tid);
  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
    return res.status(200).json({ message: "Updated todo" });
  }
  res.status(404).json({ message: "Couldn't find todo item" });
});

router.delete("/todo/:todoId", (req, res, next) => {
  todos = todos.filter((todoItem) => todoItem.id !== req.params.todoId);
  res.status(200).json({ message: "Deleted todo" });
});

export default router;
