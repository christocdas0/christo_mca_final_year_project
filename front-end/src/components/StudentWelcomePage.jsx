import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
} from "@mui/material";
import {
  AttendanceTable,
  Container,
  LeftSection,
  RightSection,
  Tile,
  WelcomeText,
  TileContainer,
  HeaderContainer,
} from "../styles/studentWelcomePage";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setGoBack } from "../redux/slices/mainSlice";
import { ArrowBack } from "@mui/icons-material";
import { TableHeader } from "../styles/viewAttendance";

function calculateAttendance(attendance) {
  const totalClasses = attendance.length;
  const classesAttended = attendance.filter(
    (entry) => entry.status === "Present"
  ).length;
  const classesMissed = totalClasses - classesAttended;
  const attendancePercentage = ((classesAttended / totalClasses) * 100).toFixed(
    2
  );

  return {
    totalClasses,
    classesAttended,
    classesMissed,
    attendancePercentage: parseFloat(attendancePercentage), // Convert back to number
  };
}

const StudentWelcomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const onlineAttendanceMangement = useSelector(
    (state) => state.onlineAttendanceMangement
  );
  const { currentUser, studentAttendance } = onlineAttendanceMangement;
  const { name } = currentUser;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleBack = () => {
    setTimeout(() => {
      navigate("/");
    }, 100);
    dispatch(setGoBack({ isFrom: "welcome" }));
  };

  return (
    <Container>
      <LeftSection>
        <HeaderContainer>
          <IconButton
            onClick={() => handleBack()}
            sx={{ marginRight: 1 }}
            title="Go Back"
          >
            <ArrowBack
              sx={{ cursor: "pointer", fontSize: 28, marginRight: 2 }}
              fontSize="large"
            />
          </IconButton>
          <WelcomeText variant="h4">{`Welcome, ${name}`}</WelcomeText>
        </HeaderContainer>

        <TileContainer>
          <Tile color="#BBDEFB">
            Total Classes: {calculateAttendance(studentAttendance).totalClasses}
          </Tile>
          <Tile color="#C8E6C9">
            Classes Attended:{" "}
            {calculateAttendance(studentAttendance).classesAttended}
          </Tile>
          <Tile color="#FFCDD2">
            Classes Missed:{" "}
            {calculateAttendance(studentAttendance).classesMissed}
          </Tile>
          <Tile color="#FFF9C4">
            Attendance Percentage:{" "}
            {calculateAttendance(studentAttendance).totalClasses === 0
              ? "0"
              : calculateAttendance(studentAttendance).attendancePercentage}
            %
          </Tile>
        </TileContainer>
      </LeftSection>
      <RightSection>
        <Typography style={{ color: "#000", textAlign: "center" }} variant="h5">
          Attendance Records
        </Typography>
        <AttendanceTable component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableHeader>Date</TableHeader>
                <TableHeader>Class</TableHeader>
                <TableHeader>Status</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentAttendance
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#F5F5F5" : "#FFFFFF",
                    }}
                  >
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.class}</TableCell>
                    <TableCell
                      style={{
                        backgroundColor:
                          row.status === "Present" ? "#C8E6C9" : "#FFCDD2",
                        color: row.status === "Present" ? "#2E7D32" : "#D32F2F",
                        fontWeight: "bold",
                      }}
                    >
                      {row.status}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </AttendanceTable>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={studentAttendance.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </RightSection>
    </Container>
  );
};

export default StudentWelcomePage;
