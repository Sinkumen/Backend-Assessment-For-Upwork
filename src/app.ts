import cookieParser from "cookie-parser";
import express, { urlencoded } from "express";
import cors from "cors";
import helmet from "helmet";

// Routes
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import todoRouter from "./routes/todo.routes";
import dotenv from "dotenv";
import path from "path";
import { errorHandler, urlNotFound } from "./middlewares/error-handler";

// Load environment variables
dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();
// Enable preflight requests for all routes
app.options("*", cors());

app.use(cors({ origin: "*" }));

app.use(express.static(path.join(__dirname, "public")));

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/todos", todoRouter);

app.use(urlNotFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

export default app;
