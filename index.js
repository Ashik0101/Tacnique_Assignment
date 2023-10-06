const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/UserRoutes");
const { taskRouter } = require("./routes/TaskRoutes");
const { authenticator } = require("./middlewares/authenticator");
const { logRequest } = require("./middlewares/logger");
const { limiter } = require("./middlewares/limiter");

const app = express();
app.use(express.json());
app.use(limiter);
//using logger middleware
app.use(logRequest);

//User
app.use("/auth", userRouter);

//Task
app.use("/", authenticator, taskRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log("Error Connecting to MongoDB: ", error);
  }

  console.log("Server is listening on PORT", process.env.PORT);
});
