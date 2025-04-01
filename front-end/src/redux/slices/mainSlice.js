import { createSlice } from "@reduxjs/toolkit";
import {
  getAllStudents,
  addAttendance,
  editAttendance,
  getAttendance,
  userLogin,
  forgotPassword,
  getAllUsers,
  deleteUser,
} from "../thunk/mainThunk";

const initialState = {
  loading: false,
  error: null,
  showLoginPage: true,
  isLoggedIn: false,
  currentUser: {},
  students: [],
  currentUserRole: "",
  studentAttendance: [],
  showForgotPasswordWin: false,
  allUsers: [],
  userDeleted: false,
  snackbar: {
    open: false,
    message: "",
    severity: "info",
  },
};

const mainSlice = createSlice({
  name: "onlineAttendanceMangement",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setShowLoginPage: (state, action) => {
      state.showLoginPage = action.payload;
    },
    setSnackbar: (state, action) => {
      state.snackbar = {
        open: action.payload.open,
        message: action.payload.message,
        severity: action.payload.severity || "info",
      };
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setGoBack: (state, action) => {
      const isFrom = action.payload.isFrom;
      if (isFrom === "welcome") {
        state.currentUserRole = "dummy";
        state.isLoggedIn = false;
      }
      state.students = [];
    },
    setShowForgotPasswordWin: (state, action) => {
      state.showForgotPasswordWin = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.currentUserRole = action?.payload?.user?.role || "";
        state.currentUser = action?.payload?.user || {};
        state.studentAttendance = action?.payload?.attendance || [];
        state.snackbar = {
          open: true,
          message: "Login successful...!",
          severity: "success",
        };
      })
      .addCase(userLogin.rejected, (state) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.snackbar = {
          open: true,
          message: "Login failed. Please check your credentials.",
          severity: "error",
        };
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.showForgotPasswordWin = false;
        state.snackbar = {
          open: true,
          message: "Password reset successfully...!",
          severity: "success",
        };
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        const errorMessage =
          action?.payload?.response?.data?.message ||
          "Failed to reset password...!";
        state.loading = false;
        state.snackbar = {
          open: true,
          message: errorMessage,
          severity: "error",
        };
      })
      .addCase(getAllStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(getAllStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        const errorMessage =
          action?.payload?.response?.data?.message ||
          "Failed to get Students data...!";
        state.snackbar = {
          open: true,
          message: errorMessage,
          severity: "error",
        };
      })
      .addCase(getAttendance.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action?.payload?.attendance?.students || [];
      })
      .addCase(getAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.students = [];
        const errorMessage =
          action?.payload?.response?.data?.message ||
          "Failed to get attendance...!";
        state.snackbar = {
          open: true,
          message: errorMessage,
          severity: "error",
        };
      })
      .addCase(addAttendance.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAttendance.fulfilled, (state) => {
        state.loading = false;
        state.snackbar = {
          open: true,
          message: "Succefully Added...!",
          severity: "success",
        };
      })
      .addCase(addAttendance.rejected, (state, action) => {
        state.loading = false;
        const errorMessage =
          action?.payload?.response?.data?.message ||
          "Failed to add attendance...!";
        state.snackbar = {
          open: true,
          message: errorMessage,
          severity: "error",
        };
      })
      .addCase(editAttendance.pending, (state) => {
        state.loading = true;
      })
      .addCase(editAttendance.fulfilled, (state) => {
        state.loading = false;
        state.snackbar = {
          open: true,
          message: "Succefully Updated...!",
          severity: "success",
        };
      })
      .addCase(editAttendance.rejected, (state, action) => {
        state.loading = false;
        const errorMessage =
          action?.payload?.response?.data?.message || "Failed to update...!";
        state.snackbar = {
          open: true,
          message: errorMessage,
          severity: "error",
        };
      })
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action?.payload?.users || [];
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        const errorMessage =
          action?.payload?.response?.data?.message || "Failed to fetch users!";
        state.snackbar = {
          open: true,
          message: errorMessage,
          severity: "error",
        };
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.userDeleted = !state.userDeleted;
        state.snackbar = {
          open: true,
          message: "Users deleted successfully...!",
          severity: "success",
        };
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        const errorMessage =
          action?.payload?.response?.data?.message ||
          "Failed to delete user...!";
        state.snackbar = {
          open: true,
          message: errorMessage,
          severity: "error",
        };
      });
  },
});

export const {
  setLoading,
  setError,
  setShowLoginPage,
  setSnackbar,
  setIsLoggedIn,
  setCurrentUser,
  setGoBack,
  setShowForgotPasswordWin,
  setAllUsers,
} = mainSlice.actions;

export default mainSlice.reducer;
