const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configure CORS
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use("/", express.static("public"));

app.use("/api/students", require("./routes/Students"));
app.use("/api/courses", require("./routes/Courses"));

app.listen(port, () => {
  const url = `http://localhost:${port}`;
  console.log("Listening at " + url);
});
