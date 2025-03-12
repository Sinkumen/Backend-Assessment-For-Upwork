import { Request, Response, NextFunction } from "express";
const asyncAwaitHandler =
  (fn: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };

export default asyncAwaitHandler;
