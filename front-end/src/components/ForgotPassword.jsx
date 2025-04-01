import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setShowForgotPasswordWin } from "../redux/slices/mainSlice";
import { forgotPassword } from "../redux/thunk/mainThunk";
import LoadMask from "./LoadMask";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  let { showForgotPasswordWin, loading } = useSelector(
    (state) => state.onlineAttendanceMangement
  );
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(
      forgotPassword({
        name: formData.name,
        username: formData.username,
        confirmPassword: formData.newPassword,
      })
    );
  };

  const onClose = () => {
    dispatch(setShowForgotPasswordWin(false));
  };

  return (
    <Dialog
      open={showForgotPasswordWin}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>Forgot Password</DialogTitle>
      <DialogContent>
        {loading && <LoadMask />}

        <TextField
          fullWidth
          margin="dense"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="New Password"
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPassword;
