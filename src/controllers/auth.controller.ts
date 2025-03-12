import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models";
import asyncAwaitHandler from "../middlewares/async-handler";
import ErrorResponse from "../utils/error-response.utils";
import sendTokenResponse from "../utils/auth.util";

// @desc Login user
// @route POST /api/v1/auth/login
const login = asyncAwaitHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorResponse("Email and password are required", 400));
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Send token response
    return sendTokenResponse(user, 200, res);
  }
);

// @desc Register user
// @route POST /api/v1/auth/register
const registerUser = asyncAwaitHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, first_name, last_name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return next(new ErrorResponse("User already exists", 400));
    }

    // Create new user
    const user = await User.create({
      username,
      first_name,
      last_name,
      email,
      password,
    });

    return sendTokenResponse(user, 201, res);
  }
);

export { login, registerUser };
