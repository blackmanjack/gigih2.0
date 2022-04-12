import axios from "axios";
import qs from "qs";

export const getAuth = async () => {
  var client_id = "e76238c1f3c946448d99a02416d2586a";
  var client_secret = "f18d92781f574745a2b03ebb942dd742";

  //   var client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  //   var client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET_ID;
  console.log(client_id, "client_id");
  console.log(client_secret, "secret");
  const BASE64_ENCODED_AUTH_CODE = btoa(client_id + ":" + client_secret);
  console.log(BASE64_ENCODED_AUTH_CODE, "base64");
  const headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${BASE64_ENCODED_AUTH_CODE}`,
    },
  };
  const data = {
    grant_type: "client_credentials",
    scope: "user-read-email playlist-modify-private playlist-read-private",
  };

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      qs.stringify(data),
      headers
    );
    console.log(response.data, "RESPONSE GET AUTH");
    console.log(response.data.access_token, "token AUth baru");
    return response.data.access_token;
  } catch (error) {
    console.log(error);
  }
};
