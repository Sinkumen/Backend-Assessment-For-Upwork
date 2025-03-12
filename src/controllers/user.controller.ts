import { Request, Response, NextFunction } from "express";
import { User } from "../models";
import asyncAwaitHandler from "../middlewares/async-handler";
import ErrorResponse from "../utils/error-response.utils";

// @desc Get all users
// @route GET /api/v1/users
const getUsers = asyncAwaitHandler(async (req: Request, res: Response) => {
  const users = await User.findAll({
    attributes: ["id", "username", "first_name", "last_name", "email"],
  });
  res.status(200).json({ success: true, count: users.length, data: users });
});

// @desc Get a single user
// @route GET /api/v1/users/:id
const getUser = asyncAwaitHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findByPk(req.params.id, {
      attributes: ["id", "username", "first_name", "last_name", "email"],
    });

    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    res.status(200).json({ success: true, data: user });
  }
);

// @desc Create a user
// @route POST /api/v1/users
const createUser = asyncAwaitHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, first_name, last_name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return next(new ErrorResponse("Email is already registered", 400));
    }

    const user = await User.create({
      username,
      first_name,
      last_name,
      email,
      password,
    });

    res.status(201).json({ success: true, data: user });
  }
);

// @desc Update a user
// @route PUT /api/v1/users/:id
const updateUser = asyncAwaitHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, first_name, last_name, email, password } = req.body;

    const user = await User.findByPk(req.params.id);
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    user.username = username || user.username;
    user.first_name = first_name || user.first_name;
    user.last_name = last_name || user.last_name;
    user.email = email || user.email;

    if (password) {
      user.password = password;
    }

    await user.save();

    res.status(200).json({ success: true, data: user });
  }
);

// @desc Delete a user
// @route DELETE /api/v1/users/:id
const deleteUser = asyncAwaitHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    await user.destroy();

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  }
);

export { getUsers, getUser, createUser, updateUser, deleteUser };
