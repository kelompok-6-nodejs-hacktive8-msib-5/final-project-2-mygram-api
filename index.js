import "dotenv/config";
import express from "express";
import { errorMiddleware } from "./middleware/error-middleware.js";
import { publicRouter } from "./route/public-api.js";
import { userRouter } from "./route/api.js";

const port = process.env.PORT;

export const web = express();

web.use(express.json());

web.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from MyGram API" });
});

web.use(publicRouter);
web.use(userRouter);
web.use(errorMiddleware);

// web.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });
