import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import LandingPage from "../../components/LandingPage";

// Mock store setup
const mockStore = configureStore([]);
const store = mockStore({
  onlineAttendanceMangement: { showLoginPage: true },
});

// Mock images since Vitest doesn’t handle imports like Webpack
vi.mock("../assets/images/landing_bg.jpg", () => "bg1.jpg");
vi.mock("../assets/images/landing_bg_1.jpg", () => "bg2.jpg");
vi.mock("../assets/images/landing_bg_2.jpg", () => "bg3.jpg");
vi.mock("../assets/images/landing_bg_3.jpg", () => "bg4.jpg");

describe("LandingPage Component", () => {
  test("renders the header text", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LandingPage />
        </BrowserRouter>
      </Provider>
    );
    expect(
      screen.getByText("Online Attendance Management System")
    ).toBeInTheDocument();
  });

  test("renders LoginPage when showLoginPage is true", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LandingPage />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
  });

  test("renders RegisterPage when showLoginPage is false", () => {
    const storeWithRegister = mockStore({
      onlineAttendanceMangement: { showLoginPage: false },
    });

    render(
      <Provider store={storeWithRegister}>
        <BrowserRouter>
          <LandingPage />
        </BrowserRouter>
      </Provider>
    );
    expect(
      screen.getByRole("heading", { name: /register/i })
    ).toBeInTheDocument();
  });
});
