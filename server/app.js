import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import routes from "./src/routes/index.js";
import errorHandler from "./src/middlewares/error.middleware.js";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Ski Places of Turkey API is running 🚀"
  });
});

app.use(errorHandler);

export default app;
