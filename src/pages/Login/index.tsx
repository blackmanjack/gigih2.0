import { Button } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { useHistory } from "react-router-dom";
import { setToken } from "../../utils/redux/tokenSlice";

const Loginpage = () => {
  const token = useSelector((state: RootStateOrAny) => state.auth.token);
  const dispatch = useDispatch();
  // console.log(token, "token");
  const history = useHistory();

  useEffect(() => {
    if (token) {
      history.push("/home");
    }
  }, [history, token]);

  const handleLogin = async () => {
    window.location.replace(
      `https://accounts.spotify.com/authorize?client_id=e76238c1f3c946448d99a02416d2586a&scope=user-read-email playlist-modify-private playlist-read-private&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A3000`
    );
  };

  const getToken = window.location.hash
    .substring(1, window.location.hash.length - 1)
    .split("&")[0]
    .split("=")[1];

  if (getToken) {
    dispatch(setToken(getToken));
  }

  return (
    <>
      <div className="container">
        <div className="login-page">
          <h1>Welcome to SpotifyClone</h1>
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </div>
    </>
  );
};

export default Loginpage;
