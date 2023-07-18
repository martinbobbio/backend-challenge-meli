// Express
import { Request, Response, NextFunction } from "express";

/**
 * Middleware for setting author information in the response.
 *
 * @function signMiddleware
 * @param {Request} req - Express Request object.
 * @param {Response} res - Express Response object.
 * @param {NextFunction} next - Express next.
 */
export const signMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { firstname, lastname } = req.query;
  res.locals.author = { firstname, lastname };
  next();
};
