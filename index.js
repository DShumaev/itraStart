const express = require("express");
const config = require("config");
const mainRouter = require("./routers/mainRouter");

const PORT = process.env.PORT || config.get("express.port");
const app = express();

app.use(express.json());
app.use("/", mainRouter);

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
