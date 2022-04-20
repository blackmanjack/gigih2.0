import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Home from "../pages/home";
import ListTrack from "../pages/spotify";
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

  return (
    <>
      <Router>
        <div>
          {token === "" ? (
            <></>
          ) : (
            <>
              <ul>
                <li>
                  <Link to="/" onClick={handleLogOut}>
                    LogOut
                  </Link>
                </li>
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/playlist">Playlist</Link>
                </li>
              </ul>
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
