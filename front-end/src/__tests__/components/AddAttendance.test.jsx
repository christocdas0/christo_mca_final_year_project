import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import attendanceReducer from "../../redux/slices/mainSlice"; // Adjust if needed
import AddAttendance from "../../components/AddAttendance";

const mockStore = configureStore([]);

// Mock Redux Thunks
import { getAllStudents, editAttendance, getAttendance } from "../../redux/thunk/mainThunk";

// vi.mock("../../redux/thunk/mainThunk", () => ({
//   getAllStudents: vi.fn(() => Promise.resolve()),
//   editAttendance: vi.fn(() => Promise.resolve()),
//   getAttendance: vi.fn(() => Promise.resolve()),
// }));

// Create a Mock Redux Store
// const createMockStore = (initialState) =>
//   configureStore({
//     reducer: { onlineAttendanceMangement: attendanceReducer },
//     preloadedState: initialState,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // FIXED
//   });

describe("AddAttendance Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      onlineAttendanceMangement: {
        students: [
          { userId: "1", name: "John Doe", studentClass: "MCA", status: "Present" },
          { userId: "2", name: "Jane Doe", studentClass: "MCA", status: "Absent" },
        ],
        loading: false,
        currentUserRole: "teacher",
      },
    });
    store.dispatch = vi.fn();
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AddAttendance />
        </BrowserRouter>
      </Provider>
    );

  test("renders the component and displays header", () => {
    renderComponent();
    expect(screen.getByText("Add Attendance")).toBeInTheDocument();
  });

  test("calls getAttendance when component mounts", () => {
    renderComponent();
    expect(getAttendance).toHaveBeenCalled();
  });

  test("renders students in the table", () => {
    renderComponent();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  test("dispatches getAllStudents when 'Get Students' button is clicked", () => {
    renderComponent();
    const button = screen.getByText("Get Students");
    fireEvent.click(button);
    expect(getAllStudents).toHaveBeenCalled();
  });

  test("updates the selected class", () => {
    renderComponent();
    const classDropdown = screen.getByLabelText("Class:");
    fireEvent.change(classDropdown, { target: { value: "BCA" } });
    expect(classDropdown.value).toBe("BCA");
  });

  test("dispatches editAttendance when clicking 'Submit' button", () => {
    renderComponent();
    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);
    expect(editAttendance).toHaveBeenCalled();
  });
});
