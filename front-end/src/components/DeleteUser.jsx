import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  TablePagination,
  IconButton,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { ArrowBack, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, deleteUser } from "../redux/thunk/mainThunk";
import LoadMask from "./LoadMask";
import { styled } from "@mui/system";
import { setAllUsers } from "../redux/slices/mainSlice";

const Container = styled("div")({
  width: "100vw",
  height: "98vh",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#FFF",
  gap: "0.5rem",
});

const HeaderContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  padding: "0.5rem 1rem",
});

const TableWrapper = styled(TableContainer)({
  width: "100%",
  flex: 1,
  overflowY: "auto",
});

const TableHeader = styled(TableCell)({
  fontWeight: "bold",
  backgroundColor: "#E3F2FD",
});

const Header = styled("h2")({
  margin: 0,
  fontWeight: "bold",
  color: "black",
});

const RoleFilterContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});

const RightActionContainer = styled("div")({
  display: "flex",
  gap: "1rem",
});

const DeleteUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, allUsers, userDeleted } = useSelector(
    (state) => state.onlineAttendanceMangement
  );

  const [selectedRows, setSelectedRows] = useState(new Set());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userList, setUserList] = useState([]);
  const [filterRole, setFilterRole] = useState("All");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [userDeleted]);

  useEffect(() => {
    if (filterRole === "All") {
      setUserList(allUsers);
    } else {
      setUserList(allUsers.filter((user) => user.role === filterRole));
    }
  }, [allUsers, filterRole]);

  const handleCheckboxChange = (id) => {
    setSelectedRows((prev) => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteUser({ userIds: [id] }));
  };

  const handleBulkDelete = () => {
    dispatch(deleteUser({ userIds: Array.from(selectedRows) }));
  };

  const goBackBtnClick = () => {
    navigate("/admin");
    dispatch(setAllUsers([]));
  };

  return (
    <Container>
      {loading ? (
        <LoadMask />
      ) : (
        <>
          <HeaderContainer>
            <IconButton onClick={() => goBackBtnClick()} title="Go Back">
              <ArrowBack fontSize="large" />
            </IconButton>
            <Header>Delete User</Header>
            <RightActionContainer>
              <RoleFilterContainer>
                <FormControl size="small">
                  <InputLabel>Filter by Role</InputLabel>
                  <Select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    style={{ minWidth: 150 }}
                  >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Teacher">Teacher</MenuItem>
                    <MenuItem value="Student">Student</MenuItem>
                  </Select>
                </FormControl>
              </RoleFilterContainer>
              <Button
                variant="contained"
                color="error"
                disabled={selectedRows.size === 0}
                onClick={handleBulkDelete}
                style={{ marginRight: "2rem" }}
              >
                Delete
              </Button>
            </RightActionContainer>
          </HeaderContainer>

          <TableWrapper component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableHeader>Select</TableHeader>
                  <TableHeader>User Name</TableHeader>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>User Role</TableHeader>
                  {userList.some((user) => user.role === "Student") &&
                    filterRole !== "All" && <TableHeader>Class</TableHeader>}
                  <TableHeader>Action</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {userList.length > 0 ? (
                  userList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user, index) => (
                      <TableRow
                        key={user.userId}
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? "#F5F5F5" : "#FFFFFF",
                          height: "20px",
                        }}
                      >
                        <TableCell>
                          <Checkbox
                            checked={selectedRows.has(user._id)}
                            onChange={() => handleCheckboxChange(user._id)}
                          />
                        </TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        {user.role === "Student" && filterRole !== "All" && (
                          <TableCell>{user.studentClass}</TableCell>
                        )}
                        <TableCell>
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(user._id)}
                            disabled={!selectedRows.has(user._id)}
                          >
                            <Delete />
                          </IconButton>
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
          </TableWrapper>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={userList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) =>
              setRowsPerPage(parseInt(event.target.value, 10))
            }
          />
        </>
      )}
    </Container>
  );
};

export default DeleteUser;
