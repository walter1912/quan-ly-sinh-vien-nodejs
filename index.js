console.log("hello world");

// import thư viện
const express = require("express");
const { errorHandler } = require("./middleware/errorHandler");
const connectDb = require("./config/mongoConnection");
const dotenv = require("dotenv").config();
const cors = require('cors');

var bodyParser = require('body-parser')
// connect mongoDB
connectDb();

const app = express();
const port = process.env.PORT || 5123;

app.use(bodyParser.json());


app.use(cors({
  origin: '*',
  // methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use("/api/sinhviens", require("./routes/sinhvienRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/giangviens", require("./routes/giangvienRoutes"));
app.use("/api/khoas", require("./routes/khoaRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));


app.use(errorHandler);
// run app

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
