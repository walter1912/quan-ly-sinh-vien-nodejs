console.log("hello world");

// import thư viện
const express = require("express");
const { errorHandler } = require("./middleware/errorHandler");
const connectDb = require("./config/mongoConnection");
const dotenv = require("dotenv").config();

// connect mongoDB
connectDb();

const app = express();
const port = process.env.PORT || 5123;

app.use(express.json());
app.use("/api/sinhviens", require("./routes/sinhvienRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/giangviens", require("./routes/giangvienRoutes"));

app.use(errorHandler);
// run app
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
