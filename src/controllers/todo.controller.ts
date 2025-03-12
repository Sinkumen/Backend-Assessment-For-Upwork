import { NextFunction, Request, Response } from "express";
import { Todo } from "../models";
import asyncAwaitHandler from "../middlewares/async-handler";
import ErrorResponse from "../utils/error-response.utils";
import { buildTodoQuery } from "../utils/query_helper.util";

// @desc Get all todos (filtered and sorted)
// @route GET /api/v1/todos
// @access Private
const getTodos = asyncAwaitHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as { id: string } | undefined;
    if (!user) {
      return next(new ErrorResponse("Not authorized", 403));
    }

    const { where, order } = buildTodoQuery(req.query, user.id);
    const todos = await Todo.findAll({ where, order });

    res.status(200).json({ success: true, count: todos.length, data: todos });
  }
);

// @desc Get a single todo by ID
// @route GET /api/v1/todos/:todoId
const getTodoById = asyncAwaitHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user: any = req.user;
    if (!user) {
      return next(new ErrorResponse("Not authorized", 403));
    }

    const { todoId } = req.params;

    const todo = await Todo.findOne({ where: { id: todoId, userId: user.id } });

    if (!todo) {
      return next(new ErrorResponse("Todo not found or unauthorized", 404));
    }

    res.status(200).json({ success: true, data: todo });
  }
);

// @desc Create a new todo
// @route POST /api/v1/todos
const createTodo = asyncAwaitHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user: any = req.user;
    if (!user) {
      return next(new ErrorResponse("Not authorized", 403));
    }
    const userId = user.id;
    const { title } = req.body;
    if (!title || !userId)
      throw new ErrorResponse("Title and user are required", 400);

    const newTodo = await Todo.create({ title, userId });
    res.status(201).json({ success: true, data: newTodo });
  }
);

// @desc Update a todo
// @route PUT /api/v1/todos/:todoId
// @access Private
const updateTodo = asyncAwaitHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user: any = req.user;
    if (!user) {
      return next(new ErrorResponse("Not authorized", 403));
    }

    const { todoId } = req.params;
    const { title, completed } = req.body;

    const todo = await Todo.findOne({ where: { id: todoId, userId: user.id } });

    if (!todo) {
      return next(new ErrorResponse("Todo not found", 404));
    }

    let completedAt = todo.completedAt;
    if (typeof completed === "boolean") {
      completedAt = completed ? new Date() : null;
    }

    // Update the todo
    await todo.update({
      title: title ?? todo.title,
      completed: completed ?? todo.completed,
      completedAt,
    });

    res.status(200).json({ success: true, data: todo });
  }
);

// @desc Delete a todo
// @route DELETE /api/v1/todos/:todoId
const deleteTodo = asyncAwaitHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user: any = req.user;
    if (!user) {
      return next(new ErrorResponse("Not authorized", 403));
    }

    const { todoId } = req.params;
    const todo = await Todo.findOne({ where: { id: todoId, userId: user.id } });

    if (!todo) {
      return next(new ErrorResponse("Todo not found or unauthorized", 404));
    }

    await todo.destroy();

    res
      .status(200)
      .json({ success: true, message: "Todo deleted successfully" });
  }
);

export { getTodos, getTodoById, createTodo, updateTodo, deleteTodo };
