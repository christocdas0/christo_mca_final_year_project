import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  MenuItem,
  Paper,
  TablePagination,
  IconButton,
} from "@mui/material";
import dayjs from "dayjs";
import {
  ButtonContainer,
  Container,
  FieldContainer,
  Header,
  Label,
  LeftSection,
  RightSection,
  StyledButton,
  StyledDatePicker,
  StyledSelect,
  TableHeader,
  HeaderContainer,
} from "../styles/addAttendance";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllStudents,
  editAttendance,
  getAttendance,
} from "../redux/thunk/mainThunk";
import LoadMask from "./LoadMask";
import { setGoBack } from "../redux/slices/mainSlice";

const AddAttendance = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { students, loading, currentUserRole } = useSelector(
    (state) => state.onlineAttendanceMangement
  );
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedClass, setSelectedClass] = useState("MCA");
  const [, setStudentsList] = useState([]);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isGetStudent, setIsGetStudent] = useState(false);

  useEffect(() => {
    const params = {
      date: selectedDate.format("YYYY-MM-DD"),
      class: selectedClass,
    };
    dispatch(getAttendance(params));
  }, [selectedDate, selectedClass]);

  useEffect(() => {
    if (isGetStudent) {
      const filteredStudents = students.filter(
        (student) => student.studentClass === selectedClass
      );
      setFilteredStudents(filteredStudents);
    } else {
      setFilteredStudents(students);
    }
  }, [students, selectedClass]);

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setPage(0);
    setSelectedRows(new Set());
    setIsGetStudent(false);
  };

  const onClickGetAllStudents = () => {
    dispatch(getAllStudents());
    setIsGetStudent(true);
  };

  const handleCheckboxChange = (id) => {
    setSelectedRows((prev) => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
  };

  const handleUpdateStatus = (status) => {
    setStudentsList((prev) =>
      prev.map((student) =>
        selectedRows.has(student.userId) ? { ...student, status } : student
      )
    );
    setFilteredStudents((prev) =>
      prev.map((student) =>
        selectedRows.has(student.userId) ? { ...student, status } : student
      )
    );

    setSelectedRows(new Set());
  };

  const handleSubmit = async () => {
    const finalData = {
      date: selectedDate.format("YYYY-MM-DD"),
      class: selectedClass,
      students: filteredStudents.map((student) => ({
        userId: student.userId,
        username: student.username,
        name: student.name,
        status: student.status || "Present",
      })),
    };
    const params = {
      finalData,
      urlEndPoint: "editAttendance",
    };
    dispatch(editAttendance(params));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleBack = () => {
    if (currentUserRole && currentUserRole.toLowerCase() === "admin") {
      navigate("/admin");
    } else {
      navigate("/teacher");
    }
    dispatch(setGoBack({ isFrom: "addAttendance" }));
  };

  const onSetSelectedDate = (date) => {
    setSelectedDate(date);
    isGetStudent(false);
  };

  return (
    <Container>
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
              <Header variant="h5">Add Attendance</Header>
            </HeaderContainer>

            <FieldContainer>
              <Label>Date:</Label>
              <StyledDatePicker
                value={selectedDate}
                onChange={(newValue) => onSetSelectedDate(newValue)}
                disableFuture
              />
            </FieldContainer>

            <FieldContainer>
              <Label>Class:</Label>
              <StyledSelect value={selectedClass} onChange={handleClassChange}>
                <MenuItem value="MCA">MCA</MenuItem>
                <MenuItem value="BCA">BCA</MenuItem>
                <MenuItem value="B.Tech">B.Tech</MenuItem>
              </StyledSelect>
            </FieldContainer>

            <ButtonContainer>
              <StyledButton variant="contained" onClick={onClickGetAllStudents}>
                Get Students
              </StyledButton>
              <StyledButton
                variant="outlined"
                color="error"
                onClick={() => handleUpdateStatus("Absent")}
                disabled={selectedRows.size === 0}
              >
                Absent
              </StyledButton>
              <StyledButton
                variant="outlined"
                color="success"
                onClick={() => handleUpdateStatus("Present")}
                disabled={selectedRows.size === 0}
              >
                Present
              </StyledButton>
              <StyledButton
                variant="contained"
                color="success"
                onClick={handleSubmit}
              >
                Submit
              </StyledButton>
            </ButtonContainer>
          </LeftSection>

          <RightSection>
            <Header
              variant="h5"
              style={{ marginBottom: "1rem", textAlign: "center" }}
            >
              Attendance Table
            </Header>
            <TableContainer component={Paper} sx={{ maxHeight: "85%" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableHeader>Select</TableHeader>
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
                      .map((student) => (
                        <TableRow key={student.userId}>
                          <TableCell>
                            <Checkbox
                              checked={selectedRows.has(student.userId)}
                              onChange={() =>
                                handleCheckboxChange(student.userId)
                              }
                            />
                          </TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{selectedClass}</TableCell>
                          <TableCell
                            sx={{
                              backgroundColor:
                                student.status === "Present"
                                  ? "#C8E6C9"
                                  : student.status === "Absent"
                                  ? "#FFCDD2"
                                  : "inherit",
                              color:
                                student.status === "Present"
                                  ? "#2E7D32"
                                  : student.status === "Absent"
                                  ? "#D32F2F"
                                  : "inherit",
                              fontWeight: "bold",
                            }}
                          >
                            {student.status}
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No results found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
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

export default AddAttendance;
