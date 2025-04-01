import { useEffect, useState } from "react";
import {
  FormContainer,
  ForgotPassword,
  RegisterButton,
  LoginHeading,
} from "../styles/loginPage";
import { Button, TextField } from "@mui/material";
import {
  setShowLoginPage,
  setShowForgotPasswordWin,
} from "../redux/slices/mainSlice";
import { userLogin } from "../redux/thunk/mainThunk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadMask from "./LoadMask";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { loading, currentUserRole } = useSelector(
    (state) => state.onlineAttendanceMangement
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const goToRegister = () => {
    dispatch(setShowLoginPage(false));
  };

  const handleLogin = () => {
    dispatch(
      userLogin({
        username,
        password,
      })
    );
  };

  useEffect(() => {
    if (currentUserRole) {
      const role = currentUserRole.toLowerCase();
      if (role === "student") {
        navigate("/student");
      } else if (role === "teacher") {
        navigate("/teacher");
      } else if (role === "admin") {
        navigate("/admin");
      }
    }
  }, [currentUserRole]);

  const onClickForgotPassword = () => {
    dispatch(setShowForgotPasswordWin(true));
  };

  return (
    <>
      {loading ? (
        <LoadMask />
      ) : (
        <FormContainer>
          <LoginHeading variant="h4" fontWeight="bold" mb={3} align="center">
            Login
          </LoginHeading>
          <TextField
            label="User Name"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, py: 1.5 }}
            onClick={handleLogin}
          >
            Login
          </Button>

          <ForgotPassword
            variant="body2"
            title="Forgot Password?"
            onClick={onClickForgotPassword}
          >
            Forgot Password?
          </ForgotPassword>

          <RegisterButton
            onClick={goToRegister}
            variant="outlined"
            color="secondary"
            fullWidth
            title="Go to Register page"
          >
            Register
          </RegisterButton>
        </FormContainer>
      )}
    </>
  );
}

export default LoginPage;
