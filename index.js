const exprss = require("express");
const { connection } = require("./config/db");

const app = exprss();

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log("Error Connecting to MongoDB: ", error);
  }

  console.log("Server is listening on PORT", process.env.PORT);
});
