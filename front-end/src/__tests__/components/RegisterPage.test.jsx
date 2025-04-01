import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // To enable matchers like toBeInTheDocument()
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import RegisterPage from "../../components/RegisterPage"; // Adjust the import path based on your folder structure
import { setShowLoginPage } from "../../redux/slices/mainSlice";

const mockStore = configureStore([]);

describe("Register Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      onlineAttendanceMangement: { showLoginPage: false },
    });
    store.dispatch = vi.fn(); // Mock dispatch function
  });

  it("renders Register heading", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      </Provider>
    );

    expect(
      screen.getByRole("heading", { name: "Register" }) // Selects the heading
    ).toBeInTheDocument();
  });

  it("renders username, full name, password and confirm password fields", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByLabelText("User Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("renders go to login and register buttons", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      </Provider>
    );

    expect(
      screen.getByRole("button", { name: "Register" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Go to Login" })
    ).toBeInTheDocument();
  });

  it("dispatches action when clicking 'Go to Login' hyperlink", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      </Provider>
    );

    const goToLoginLink = screen.getByRole("link", { name: "Go to Login" });
    fireEvent.click(goToLoginLink);

    expect(store.dispatch).toHaveBeenCalledWith(setShowLoginPage(true));
  });
});
