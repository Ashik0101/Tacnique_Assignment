const express = require("express");
const swaggerUi = require("swagger-ui-express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/UserRoutes");
const { taskRouter } = require("./routes/TaskRoutes");
const { authenticator } = require("./middlewares/authenticator");
const { logRequest } = require("./middlewares/logger");
const { limiter } = require("./middlewares/limiter");
const swaggerSpec = require("./swagger");

const app = express();
app.use(express.json());

//using rate limiter middleware
app.use(limiter);

//using logger middleware
app.use(logRequest);

//User
app.use("/auth", userRouter);

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Hi, This is the base URL for Tacnique Assignment!",
  });
});
//Task
app.use("/task", authenticator, taskRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log("Error Connecting to MongoDB: ", error);
  }

  console.log("Server is listening on PORT", process.env.PORT);
});
