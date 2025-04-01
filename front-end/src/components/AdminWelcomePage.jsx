import {
  AdminContainer,
  Tile,
  AdminTileContainer,
  TileText,
  WelcomeText,
  HeaderContainer,
} from "../styles/teacherWelcomePage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { setGoBack } from "../redux/slices/mainSlice";

const AdminWelcomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onlineAttendanceMangement = useSelector(
    (state) => state.onlineAttendanceMangement
  );
  const { currentUser } = onlineAttendanceMangement;
  const { name } = currentUser;

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleBack = () => {
    setTimeout(() => {
      navigate("/");
    }, 100);
    dispatch(setGoBack({ isFrom: "welcome" }));
  };

  return (
    <AdminContainer className="container">
      <HeaderContainer>
        <IconButton
          onClick={handleBack}
          sx={{ marginRight: 1 }}
          title="Go Back"
          style={{ position: "absolute", left: "1%", top: "1%" }}
        >
          <ArrowBack
            sx={{ cursor: "pointer", fontSize: 28, marginRight: 2 }}
            fontSize="large"
          />
        </IconButton>
        <WelcomeText variant="h4">{`Welcome, ${name}`}</WelcomeText>
      </HeaderContainer>

      <AdminTileContainer className="admin">
        <Tile
          onClick={() => handleNavigation("/admin/attendance/view")}
          title="View Attendance"
        >
          <TileText>View Attendance</TileText>
        </Tile>
        <Tile
          onClick={() => handleNavigation("/admin/attendance/edit")}
          title="Edit Attendance"
        >
          <TileText>Edit Attendance</TileText>
        </Tile>
        <Tile
          onClick={() => handleNavigation("/admin/attendance/add")}
          title="Add Attendance"
        >
          <TileText>Add Attendance</TileText>
        </Tile>
        <Tile
          onClick={() => handleNavigation("/admin/delete-user")}
          title="Delete User"
        >
          <TileText>Delete User</TileText>
        </Tile>
      </AdminTileContainer>
    </AdminContainer>
  );
};

export default AdminWelcomePage;
