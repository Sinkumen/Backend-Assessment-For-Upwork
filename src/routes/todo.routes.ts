import express from "express";
import {
  getTodos,
  createTodo,
  deleteTodo,
  getTodoById,
  updateTodo,
} from "../controllers/todo.controller";
import { protectRoute } from "../middlewares/auth";

const router = express.Router();

router.route("/").get(protectRoute, getTodos).post(protectRoute, createTodo);

router
  .route("/:todoId")
  .get(protectRoute, getTodoById)
  .put(protectRoute, updateTodo)
  .delete(protectRoute, deleteTodo);

export default router;
