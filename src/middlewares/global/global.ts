// Express
import { NextFunction, Request, Response } from "express";
// Console colors
import chalk from "chalk";

/**
 * Middleware for cors logic
 *
 * @function corsMiddleware
 * @param {Request} req - Express Request object.
 * @param {Response} res - Express Response object.
 * @param {NextFunction} next - Express next.
 */
export const corsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
};

/**
 * Middleware for log api requests
 *
 * @function loggerMiddleware
 * @param {Request} req - Express Request object.
 * @param {Response} res - Express Response object.
 * @param {NextFunction} next - Express next.
 */
export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.locals.originalSend = res.send;

  console.log(chalk.blueBright("Request"));
  console.log(chalk.blueBright(`Method: ${req.method}`));
  console.log(chalk.blueBright(`Endpoint: ${req.url}`));
  res.send = function (...args: any[]): any {
    console.log(chalk.blueBright(`Response: ${args[0]}`));
    res.locals.originalSend.apply(res, args);
  };
  next();
};
