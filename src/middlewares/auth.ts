import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models";

const protectRoute = async (req: Request, res: Response, next: any) => {
  let token: string;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ error: "Not authorized to access this route" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || ""
    ) as JwtPayload;
    req.user = await User.findByPk(decoded.id);

    next();
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({ error: "Not authorized to access this route" });
  }
};

const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || ""
      ) as JwtPayload;
      req.user = await User.findByPk(decoded.id);
    }
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({ error: "Not authorized to access this route" });
  }
};

export { protectRoute, optionalAuth };
