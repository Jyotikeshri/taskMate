import db_connect from "./utils/DB.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routes from "./routes/index.js";
import {
  errorHandler,
  routeNotFoundHandler,
} from "./middlewares/errorMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.urlencoded());
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api", routes);

app.use(routeNotFoundHandler);

app.use(errorHandler);

app.listen(PORT, async () => {
  await db_connect();
  console.log(`Server is running on port ${PORT}`);
});
