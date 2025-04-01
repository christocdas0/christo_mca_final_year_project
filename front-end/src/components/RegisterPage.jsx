import { useState } from "react";
import {
  FormContainer,
  LoginRedirect,
  RegisterButton,
  RegisterHeading,
} from "../styles/registerPage";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setSnackbar, setShowLoginPage } from "../redux/slices/mainSlice";
import axios from "axios";

const apiUrl = "http://localhost:8001/api/user/adduser";

function RegisterPage() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    role: "Student",
    studentClass: "MCA",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { fullName, username, password, role, studentClass } = formData;

    if (!fullName || !username || !password) {
      dispatch(
        setSnackbar({
          open: true,
          message: "All fields are required!",
          severity: "error",
        })
      );
      return;
    }

    if (role === "Student" && !studentClass) {
      dispatch(
        setSnackbar({
          open: true,
          message: "Please select a class!",
          severity: "error",
        })
      );
      return;
    }

    try {
      await axios.post(apiUrl, {
        userId: Date.now().toString(),
        name: fullName,
        username,
        password,
        role,
        studentClass: role === "Student" ? studentClass : null, // Only send class if Student
      });

      dispatch(
        setSnackbar({
          open: true,
          message: "Registration successful!",
          severity: "success",
        })
      );

      setFormData({
        fullName: "",
        username: "",
        password: "",
        role: "Student",
        studentClass: "MCA",
      });
    } catch (error) {
      dispatch(
        setSnackbar({
          open: true,
          message: error.response?.data?.message || "Registration failed.",
          severity: "error",
        })
      );
    }
  };

  return (
    <FormContainer>
      <RegisterHeading variant="h4" fontWeight="bold" mb={3} align="center">
        Register
      </RegisterHeading>

      <TextField
        label="Full Name"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="User Name"
        name="username"
        value={formData.username}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>User Role</InputLabel>
        <Select name="role" value={formData.role} onChange={handleChange}>
          <MenuItem value="Student">Student</MenuItem>
          <MenuItem value="Teacher">Teacher</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
        </Select>
      </FormControl>

      {/* Class Dropdown - Only visible for Students */}
      {formData.role === "Student" && (
        <FormControl fullWidth margin="normal">
          <InputLabel>Select Class</InputLabel>
          <Select
            name="studentClass"
            value={formData.studentClass}
            onChange={handleChange}
          >
            <MenuItem value="MCA">MCA</MenuItem>
            <MenuItem value="BCA">BCA</MenuItem>
            <MenuItem value="B.Tech">B.Tech</MenuItem>
          </Select>
        </FormControl>
      )}

      <RegisterButton
        variant="contained"
        fullWidth
        title="Register"
        onClick={handleRegister}
      >
        Register
      </RegisterButton>

      <LoginRedirect variant="body2">
        Already registered?{" "}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            dispatch(setShowLoginPage(true));
          }}
          title="Go to Login"
        >
          Go to Login
        </a>
      </LoginRedirect>
    </FormContainer>
  );
}

export default RegisterPage;
