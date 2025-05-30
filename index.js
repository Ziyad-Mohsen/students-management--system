const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use("/", express.static("public"));

app.use("/api/students", require("./routes/Students"));

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
