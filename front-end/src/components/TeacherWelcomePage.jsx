import {
  Container,
  Tile,
  TileContainer,
  TileText,
  WelcomeText,
  HeaderContainer,
} from "../styles/teacherWelcomePage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { setGoBack } from "../redux/slices/mainSlice";

const TeacherWelcomePage = () => {
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
    <Container className="container">
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

      <TileContainer>
        <Tile
          onClick={() => handleNavigation("/teacher/attendance/view")}
          title="View Attendance"
        >
          <TileText>View Attendance</TileText>
        </Tile>
        <Tile
          onClick={() => handleNavigation("/teacher/attendance/edit")}
          title="Edit Attendance"
        >
          <TileText>Edit Attendance</TileText>
        </Tile>
        <Tile
          onClick={() => handleNavigation("/teacher/attendance/add")}
          title="Add Attendance"
        >
          <TileText>Add Attendance</TileText>
        </Tile>
      </TileContainer>
    </Container>
  );
};

export default TeacherWelcomePage;
