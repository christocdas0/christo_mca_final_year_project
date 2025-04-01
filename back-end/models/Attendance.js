const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
    enum: ["MCA", "BCA", "B.Tech"],
  },
  students: [
    {
      userId: { type: String, required: true },
      username: { type: String, required: true },
      name: { type: String, required: true },
      status: { type: String, required: true, enum: ["Present", "Absent"] },
    },
  ],
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
