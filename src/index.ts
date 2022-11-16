import express from "express";
import { apiErrorHandler } from "./error/api-error-handler";
import { router } from "./routes/router";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3001;

app.use(express.json());
app.use(router);
app.use(apiErrorHandler);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
