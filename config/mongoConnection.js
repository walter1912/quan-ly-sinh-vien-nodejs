const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      "Successfully connect to mongoDB <3",
      `Connection host:  ${connect.connection.host}`,
      `Connection name:  ${connect.connection.name}`
    );
  } catch (err) {
    console.log("Error when connect mongoDB: ", err);
    process.exit(1);
  }
};
module.exports = connectDb;