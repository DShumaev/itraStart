const express = require("express");
const config = require("config");
const mainRouter = require("./routers/mainRouter");
const errorHandler = require("./middleware/index");
const userRouter = require("./routers/userRouter");

const PORT = process.env.PORT || config.get("express.port");
const app = express();

app.use(express.json());
app.use("/", mainRouter);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
