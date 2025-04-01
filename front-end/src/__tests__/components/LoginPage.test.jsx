import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // To enable matchers like toBeInTheDocument()
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "../../components/LoginPage"; // Adjust the import path based on your folder structure
import { setShowLoginPage } from "../../redux/slices/mainSlice";

const mockStore = configureStore([]);

describe("LoginPage Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      onlineAttendanceMangement: { showLoginPage: true },
    });
    store.dispatch = vi.fn(); // Mock dispatch function
  });

  it("renders login heading", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    expect(
      screen.getByRole("heading", { name: "Login" }) // Selects the heading
    ).toBeInTheDocument();
  });

  it("renders username and password fields", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByLabelText("User Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("renders login and register buttons", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Register" })
    ).toBeInTheDocument();
  });

  it("Render forgot password button", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );
    screen.debug();
    expect(
      screen.getByRole("paragraph", { name: "Forgot Password?" })
    ).toBeInTheDocument();
  });

  it("dispatches action when clicking 'Register' button", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    const registerButton = screen.getByRole("button", { name: "Register" });
    fireEvent.click(registerButton);

    expect(store.dispatch).toHaveBeenCalledWith(setShowLoginPage(false));
  });
});
