import { Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSnackbar } from "../redux/slices/mainSlice";

const SnackbarComponent = () => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.onlineAttendanceMangement)?.snackbar
    .open;
  const message = useSelector((state) => state.onlineAttendanceMangement)
    ?.snackbar.message;
  const severity = useSelector((state) => state.onlineAttendanceMangement)
    ?.snackbar.severity;

  const handleClose = () => {
    dispatch(
      setSnackbar({
        open: false,
      })
    );
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ minWidth: "250px" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
