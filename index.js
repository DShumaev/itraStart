const express = require("express");
const mainRouter = require("./routers/mainRouter");
const errorHandler = require("./middleware/index");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use("/", mainRouter);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
