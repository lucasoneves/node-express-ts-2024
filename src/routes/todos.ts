import { Router } from "express";
import { Todo } from "../models/todo";

type BodyText = {
  text: string;
}

type RequestParams = {
  todoId: string;
}

const router = Router();

let todos: Todo[] = [];

router.get("/", (req, res) => {
  res.status(200).json({ todos });
});

router.post("/todo", (req, res) => {
  const body = req.body as BodyText;
  const newToDo: Todo = {
    id: new Date().toISOString(),
    text: body.text,
  };

  todos.push(newToDo);

  res.status(201).json({ message: "Added to do" });
});

router.put("/todo/:todoId", (req, res, next) => {
  const todo = req.params as RequestParams
  const body = req.body as BodyText;
  const todoIndex = todos.findIndex((item) => item.id === todo.todoId);
  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
    return res.status(200).json({ message: "Updated todo" });
  }
  res.status(404).json({ message: "Couldn't find todo item" });
});

router.delete("/todo/:todoId", (req, res, next) => {
  const todo = req.params as RequestParams
  todos = todos.filter((todoItem) => todoItem.id !== todo.todoId);
  res.status(200).json({ message: "Deleted todo" });
});

export default router;
