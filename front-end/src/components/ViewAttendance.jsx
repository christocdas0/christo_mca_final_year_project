import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Paper,
  IconButton,
  TablePagination,
} from "@mui/material";
import dayjs from "dayjs";
import {
  Container,
  FieldContainer,
  Header,
  Label,
  LeftSection,
  RightSection,
  StyledDatePicker,
  StyledSelect,
  TableHeader,
  HeaderContainer,
} from "../styles/viewAttendance";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAttendance } from "../redux/thunk/mainThunk";
import LoadMask from "./LoadMask";
import { setGoBack } from "../redux/slices/mainSlice";

const ViewAttendance = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedClass, setSelectedClass] = useState("MCA");

  const { students, loading, currentUserRole } = useSelector(
    (state) => state.onlineAttendanceMangement
  );

  const [filteredStudents, setFilteredStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const params = {
      date: selectedDate.format("YYYY-MM-DD"),
      class: selectedClass,
    };
    dispatch(getAttendance(params));
  }, [selectedDate, selectedClass]);

  useEffect(() => {
    setFilteredStudents(students);
  }, [students, selectedClass]);

  const handleBack = () => {
    if (currentUserRole && currentUserRole.toLowerCase() === "admin") {
      navigate("/admin");
    } else {
      navigate("/teacher");
    }
    dispatch(setGoBack({ isFrom: "viewAttendance" }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container className="container">
      {loading ? (
        <LoadMask />
      ) : (
        <>
          <LeftSection>
            <HeaderContainer>
              <IconButton
                onClick={handleBack}
                sx={{ marginRight: 1 }}
                title="Go Back"
              >
                <ArrowBack
                  sx={{ cursor: "pointer", fontSize: 28, marginRight: 2 }}
                  fontSize="large"
                />
              </IconButton>
              <Header variant="h5">View Attendance</Header>
            </HeaderContainer>

            <FieldContainer>
              <Label>Date:</Label>
              <StyledDatePicker
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                disableFuture
              />
            </FieldContainer>

            <FieldContainer>
              <Label>Class:</Label>
              <StyledSelect
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <MenuItem value="MCA">MCA</MenuItem>
                <MenuItem value="BCA">BCA</MenuItem>
                <MenuItem value="B.Tech">B.Tech</MenuItem>
              </StyledSelect>
            </FieldContainer>
          </LeftSection>

          <RightSection>
            <Header
              variant="h5"
              style={{ marginBottom: "1rem", textAlign: "center" }}
            >
              Attendance Table
            </Header>
            <TableContainer
              component={Paper}
              sx={{ maxHeight: "85%", overflow: "auto" }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Class</TableHeader>
                    <TableHeader>Status</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => (
                        <TableRow
                          key={row.userId}
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? "#F5F5F5" : "#FFFFFF",
                          }}
                        >
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{selectedClass}</TableCell>
                          <TableCell
                            sx={{
                              backgroundColor:
                                row.status === "Present"
                                  ? "#C8E6C9"
                                  : "#FFCDD2",
                              color:
                                row.status === "Present"
                                  ? "#2E7D32"
                                  : "#D32F2F",
                              fontWeight: "bold",
                            }}
                          >
                            {row.status}
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        No records found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={filteredStudents.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </RightSection>
        </>
      )}
    </Container>
  );
};

export default ViewAttendance;
