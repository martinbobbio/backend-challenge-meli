// Express
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
// Environment vars
import dotenv from "dotenv";
// Console colors
import chalk from "chalk";
// Middlewares
import {
  corsMiddleware,
  loggerMiddleware,
  signMiddleware,
} from "./middlewares";
// Routes
import itemsRouter from "./routes/items/items";
import { health } from "./controllers";

// Init
dotenv.config();
const app = express();
const port = process.env.PORT;

// Middlewares
app.use(corsMiddleware);
app.use(loggerMiddleware);
app.use(signMiddleware);

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.get("/", health);
app.use(itemsRouter);

// App listener
app.listen(port, () => {
  console.log(chalk.whiteBright("The server has started successfully."));
  console.log(chalk.greenBright(`Server running on http://localhost:${port}`));
});
