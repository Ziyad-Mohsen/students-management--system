const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use("/", express.static("public"));

app.use("/api/students", require("./routes/Students"));

app.listen(port, () => {
  const url = `http://localhost:${port}`;
  console.log("Listening at " + url);
});
