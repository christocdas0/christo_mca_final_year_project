const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String },
  role: { type: String, required: true, enum: ["Admin", "Teacher", "Student"] },
  studentClass: {
    type: String,
    required: function () {
      return this.role === "Student";
    },
  },
  flag: { type: String },
});

UserSchema.index({ username: 1, studentClass: 1 }, { unique: true });

module.exports = mongoose.model("User", UserSchema);
