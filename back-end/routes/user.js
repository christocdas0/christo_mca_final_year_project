const router = require("express").Router();
const bcrypt = require("bcryptjs");
const AddUser = require("../models/User");
const Attendance = require("../models/Attendance");

// LOGIN API - Validate username & password
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await AddUser.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    // If user is a student, fetch attendance records
    let studentAttendance = [];
    if (user.role === "Student") {
      const attendanceRecords = await Attendance.find({});

      // Filter attendance where userId matches
      studentAttendance = attendanceRecords
        .map((record) => {
          const studentData = record.students.find(
            (s) => s.userId === user.userId
          );
          if (studentData) {
            return {
              date: record.date,
              class: record.class,
              status: studentData.status,
            };
          }
        })
        .filter(Boolean);
    }

    // Respond with login success and user data
    res.status(200).json({
      message: "Login successful",
      user,
      attendance: studentAttendance,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ADD USER

router.post("/adduser", async (req, res) => {
  try {
    const { username, name, password, role, studentClass } = req.body;

    if (!username || !name || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const validRoles = ["Admin", "Teacher", "Student"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role." });
    }

    // const existingUser = await AddUser.findOne({ username });
    const existingUser = await AddUser.findOne({ username, role });

    if (role !== "Student" && existingUser) {
      return res.status(400).json({ message: "Username is already taken." });
    }

    if (role === "Student") {
      if (!studentClass) {
        return res
          .status(400)
          .json({ message: "Student Class is required for students." });
      }

      const existingStudent = await AddUser.findOne({
        username,
        role: "Student",
        studentClass,
      });

      if (existingStudent) {
        return res.status(400).json({
          message: "Student with this username already exists in this class.",
        });
      }
    } else {
      if (studentClass) {
        return res
          .status(400)
          .json({ message: "Only students can have a class assigned." });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userId = `USER_${Date.now()}`;

    const newUserData = {
      userId,
      username,
      name,
      password: hashedPassword,
      role,
    };

    if (role === "Student") {
      newUserData.studentClass = studentClass;
      newUserData.status = "Present";
    }

    const newUser = new AddUser(newUserData);
    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully!", user: savedUser });
  } catch (err) {
    console.error("Save New User Failed", err);
    res.status(500).json({ message: "Save New User Failed." });
  }
});

// GET ALL THE USERS

router.get("/getusers", async (req, res) => {
  try {
    const users = await AddUser.find({}, "-password");

    if (!users.length) {
      return res.status(404).json({ message: "No users found." });
    }

    res.status(200).json({ users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch users." });
  }
});

// GET ALL STUDENTS
router.get("/getstudents", async (req, res) => {
  try {
    const students = await AddUser.find({ role: "Student" });

    if (students.length === 0) {
      return res.status(404).json({ message: "No students found." });
    }

    res.status(200).json(students);
  } catch (err) {
    console.error("Failed to fetch students:", err);
    res.status(500).json({ message: "Failed to fetch students." });
  }
});

//  FORGOT PASSWORD
router.post("/forgot-password", async (req, res) => {
  try {
    const { username, name, confirmPassword } = req.body;

    // Check if username and new password are provided
    if (!username || !confirmPassword) {
      return res
        .status(400)
        .json({ message: "Username and new password are required." });
    }

    // Find user by username
    const user = await AddUser.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // If name is provided, check if it matches the stored name
    if (name && user.name !== name) {
      return res
        .status(400)
        .json({ message: "Name does not match our records." });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(confirmPassword, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully!" });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

//  DELETE USER/USERS
router.delete("/deleteusers", async (req, res) => {
  try {
    const { userIds } = req.body; // Expect an array of user IDs

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid request. Provide user IDs." });
    }

    // Find users by IDs
    const users = await AddUser.find({ _id: { $in: userIds } });

    if (!users.length) {
      return res.status(404).json({ message: "No matching users found." });
    }

    // Delete users from AddUser collection
    await AddUser.deleteMany({ _id: { $in: userIds } });

    // Get userIds of students to remove from attendance
    const studentUserIds = users
      .filter((user) => user.role === "Student")
      .map((user) => user.userId); // Change from `_id` to `userId`

    if (studentUserIds.length > 0) {
      await Attendance.updateMany(
        { "students.userId": { $in: studentUserIds } }, // Find records containing students by userId
        { $pull: { students: { userId: { $in: studentUserIds } } } }, // Remove them from students array
        { multi: true } // Ensure multiple documents are updated
      );
    }

    res.status(200).json({ message: "Users deleted successfully." });
  } catch (err) {
    console.error("Error deleting users:", err);
    res.status(500).json({ message: "Failed to delete users." });
  }
});

module.exports = router;
