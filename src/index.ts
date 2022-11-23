import express from "express";
import { apiErrorHandler } from "./error/api-error-handler";
import { userRouter } from "./routes/user-router";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(apiErrorHandler);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
