const mongoose = require("mongoose");

const khoaSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  ten: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Khoa", khoaSchema);
