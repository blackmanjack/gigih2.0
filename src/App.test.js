import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "./utils/redux/store";
import Loginpage from "./pages/Login";
import { BrowserRouter, Redirect } from "react-router-dom";
import Home from "./pages/Home";

test("Should render login page properly", () => {
  render(
    <Provider store={store}>
      <Loginpage />
    </Provider>
  );

  const linkElement = screen.getByText(/Welcome to SpotifyClone/i);
  const loginBtn = screen.getByText("Login");
  userEvent.click(loginBtn);
  expect(loginBtn).toBeInTheDocument();
  expect(linkElement).toBeInTheDocument();

  // await waitFor(() => {
  //   expect(window.location.pathname).toBe("https://accounts.spotify.com");
  // });
  // expect (await window.location.pathname).toBe("https://accounts.spotify.com");
  // expect(window.location.replace).toEqual(
  //   "https://accounts.spotify.com/"
  // );
});

test("Should render home page properly", async () => {
  render(
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    </>
  );
  expect(await screen.findByText("New Release")).toBeInTheDocument();
});
