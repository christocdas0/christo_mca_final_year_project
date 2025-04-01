import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import SnackbarComponent from "./components/SnackbarComponent";
import { Suspense, lazy } from "react";
import AdminWelcomePage from "./components/AdminWelcomePage";
import DeleteUser from "./components/DeleteUser";

const LandingPage = lazy(() => import("./components/LandingPage"));
const StudentWelcomePage = lazy(() =>
  import("./components/StudentWelcomePage")
);
const TeacherWelcomePage = lazy(() =>
  import("./components/TeacherWelcomePage")
);
const ViewAttendance = lazy(() => import("./components/ViewAttendance"));
const AddAttendance = lazy(() => import("./components/AddAttendance"));
const EditAttendance = lazy(() => import("./components/EditAttendance"));

function App() {
  const isLoggedIn = useSelector(
    (state) => state.onlineAttendanceMangement
  )?.isLoggedIn;

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/student"
            element={isLoggedIn ? <StudentWelcomePage /> : <LandingPage />}
          />
          <Route
            path="/teacher"
            element={isLoggedIn ? <TeacherWelcomePage /> : <LandingPage />}
          />
          <Route
            path="/teacher/attendance/add"
            element={isLoggedIn ? <AddAttendance /> : <LandingPage />}
          />
          <Route
            path="/teacher/attendance/view"
            element={isLoggedIn ? <ViewAttendance /> : <LandingPage />}
          />
          <Route
            path="/teacher/attendance/edit"
            element={isLoggedIn ? <EditAttendance /> : <LandingPage />}
          />
          <Route
            path="/admin"
            element={isLoggedIn ? <AdminWelcomePage /> : <LandingPage />}
          />
          <Route
            path="/admin/attendance/add"
            element={isLoggedIn ? <AddAttendance /> : <LandingPage />}
          />
          <Route
            path="/admin/attendance/view"
            element={isLoggedIn ? <ViewAttendance /> : <LandingPage />}
          />
          <Route
            path="/admin/attendance/edit"
            element={isLoggedIn ? <EditAttendance /> : <LandingPage />}
          />
          <Route
            path="/admin/delete-user"
            element={isLoggedIn ? <DeleteUser /> : <LandingPage />}
          />
        </Routes>
      </Suspense>
      <SnackbarComponent />
    </Router>
  );
}

export default App;
