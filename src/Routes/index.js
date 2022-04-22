import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Home from "../pages/Home";
import ListTrack from "../pages/Playlist";
import { useSelector, useDispatch } from "react-redux";
import Loginpage from "../pages/Login";
import { Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { setToken } from "../utils/redux/tokenSlice";

const SwitchRouter = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  console.log(token, "token");

  const PrivateRoute = ({ ...rest }) => {
    if (token === "" || token === undefined) {
      return <Redirect to="/" />;
    } else {
      return <Route {...rest} />;
    }
  };

  const handleLogOut = () => {
    console.log("LogOut");
    dispatch(setToken(""));
  };

  // let menuIcon = document.querySelector(".menuIcon");
  // let nav = document.querySelector(".overlay-menu");

  // menuIcon.addEventListener("click", () => {
  //   if (nav.style.transform != "translateX(0%)") {
  //     nav.style.transform = "translateX(0%)";
  //     nav.style.transition = "transform 0.2s ease-out";
  //   } else {
  //     nav.style.transform = "translateX(-100%)";
  //     nav.style.transition = "transform 0.2s ease-out";
  //   }
  // });

  // // Toggle Menu Icon ========================================
  // let toggleIcon = document.querySelector(".menuIcon");

  // toggleIcon.addEventListener("click", () => {
  //   if (toggleIcon.className != "menuIcon toggle") {
  //     toggleIcon.className += " toggle";
  //   } else {
  //     toggleIcon.className = "menuIcon";
  //   }
  // });
  return (
    <>
      <Router>
        <div>
          {token === "" ? (
            <></>
          ) : (
            <>
              <nav id="navbar" class="">
                <div class="nav-wrapper">
                  <div className="logo">
                    <img width="160px" src="/img/Spotify.png" alt="image" />
                  </div>
                  <ul id="menu">
                    <li>
                      <Link to="/home">Home</Link>
                    </li>
                    <li>
                      <Link to="/playlist">Playlist</Link>
                    </li>
                    <li>
                      <Link to="/" onClick={handleLogOut}>
                        LogOut
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
              <hr />
            </>
          )}

          <Switch>
            <Route exact path="/">
              <Loginpage />
            </Route>
            <PrivateRoute exact path="/home">
              <Home></Home>
            </PrivateRoute>
            <PrivateRoute path="/playlist">
              {/* <PlaylistPage></PlaylistPage> */}
              <ListTrack></ListTrack>
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default SwitchRouter;
