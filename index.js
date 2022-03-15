const express = require("express");
const config = require("config");
const mainRouter = require("./routers/mainRouter");
const userRouter = require("./routers/userRouter");
const authRouter = require("./routers/authRouter");

const PORT = process.env.PORT || config.get("express.port");
const app = express();

app.use(express.json());
app.use("/", mainRouter);
app.use("/user", userRouter);
app.use("/user", authRouter);

function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });
  } catch (e) {
    console.log("Problem with starting HTTP server");
    process.exit(1);
  }
}

startServer();

module.exports = app;
