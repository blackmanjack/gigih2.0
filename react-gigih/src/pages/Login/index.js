import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setToken } from "../../utils/redux/tokenSlice";
import { getAuth } from "./login";
const Loginpage = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  // console.log(token, "token");
  const history = useHistory();

  useEffect(() => {
    if (token) {
      history.push("/home");
    }
  }, [token]);

  const handleLogin = async () => {
    //console.log(process.env.REACT_APP_SPOTIFY_CLIENT_ID, "clientID");

    window.location.replace(
      `https://accounts.spotify.com/authorize?client_id=e76238c1f3c946448d99a02416d2586a&scope=user-read-email playlist-modify-private playlist-read-private&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A3000`
    );
    // dispatch(
    //   setToken({
    //     token: window.location.hash
    //       .substring(1, window.location.hash.length - 1)
    //       .split("&")[0]
    //       .split("=")[1],
    //   })
    // );
  };

  const getToken = window.location.hash
    .substring(1, window.location.hash.length - 1)
    .split("&")[0]
    .split("=")[1];
  console.log(getToken, "tokenBAru");

  if (getToken) {
    dispatch(setToken(getToken));
    // getAuth();
  }

  var client_id = "CLIENT_ID";
  var client_secret = "CLIENT_SECRET";

  // var authOptions = {
  //   url: "https://accounts.spotify.com/api/token",
  //   headers: {
  //     Authorization:
  //       "Basic " +
  //       new Buffer(client_id + ":" + client_secret).toString("base64"),
  //   },
  //   form: {
  //     grant_type: "client_credentials",
  //   },
  //   json: true,
  // };

  // request.post(authOptions, function (error, response, body) {
  //   if (!error && response.statusCode === 200) {
  //     var token = body.access_token;
  //   }
  // });

  const loginAccess = () => {
    axios.post(`https://accounts.spotify.com/api/token`);
  };

  return (
    <>
      <div className="container">
        <div className="login-page">
          <h1>Welcome to SpotifyClone</h1>
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </>
  );
};

export default Loginpage;
