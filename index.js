console.log("hello world");

// import thư viện
const express = require("express");
const { errorHandler } = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT || 5123;

app.use(express.json());
app.use("/api/sinhvien", require("./routes/sinhvienRoutes"));
app.use(errorHandler);
// run app
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
