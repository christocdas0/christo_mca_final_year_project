const router = require("express").Router();
const Attendance = require("../models/Attendance");

router.get("/getAttendance/:date/:class", async (req, res) => {
  try {
    const { date, class: studentClass } = req.params;

    const attendance = await Attendance.findOne({ date, class: studentClass });

    if (attendance) {
      return res.status(200).json({
        message: "Attendance found.",
        attendance,
      });
    }

    return res.status(404).json({
      message: "No attendance found for the given date and class.",
    });
  } catch (err) {
    console.error("Error fetching attendance:", err);
    res.status(500).json({ message: "Failed to fetch attendance." });
  }
});

router.post("/addAttendance", async (req, res) => {
  try {
    const { date, class: studentClass, students } = req.body;

    if (!date || !studentClass || !students || !Array.isArray(students)) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingAttendance = await Attendance.findOne({
      date,
      class: studentClass,
    });

    if (existingAttendance) {
      return res.status(400).json({
        message: "Attendance already marked for this class this date.",
      });
    }

    const newAttendance = new Attendance({
      date,
      class: studentClass,
      students,
    });
    await newAttendance.save();

    res.status(201).json({ message: "Attendance marked successfully!" });
  } catch (err) {
    console.error("Error marking attendance:", err);
    res.status(500).json({ message: "Failed to mark attendance." });
  }
});

router.put("/editAttendance", async (req, res) => {
  try {
    const { date, class: studentClass, students } = req.body;

    if (!date || !studentClass || !students || !Array.isArray(students)) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingAttendance = await Attendance.findOne({
      date,
      class: studentClass,
    });

    if (!existingAttendance) {
      const newAttendance = new Attendance({
        date,
        class: studentClass,
        students,
      });
      await newAttendance.save();
    } else {
      existingAttendance.students = students;
      await existingAttendance.save();
    }

    res.status(200).json({ message: "Attendance updated successfully!" });
  } catch (err) {
    console.error("Error updating attendance:", err);
    res.status(500).json({ message: "Failed to update attendance." });
  }
});

module.exports = router;
