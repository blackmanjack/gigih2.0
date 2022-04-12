// import data from "./data";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import Playlist from "../../components/playlist";
// import { useSelector, useDispatch } from "react-redux";
// import { setToken } from "../../utils/redux/tokenSlice";

const PlaylistPage = () => {
  // const dispatch = useDispatch();
  // const token = useSelector((state) => state.auth.token);
  // const [form, setForm] = useState({});
  // const [user, setUser] = useState("");
  // const [userID, setUserID] = useState("");
  // const [data, setData] = useState([]);
  // const [playlist, setPlaylist] = useState([]);
  // const [listUri, setListUri] = useState([]);

  // const handleLogin = () => {
  //   //console.log(process.env.REACT_APP_SPOTIFY_CLIENT_ID, "clientID");
  //   window.open(
  //     `https://accounts.spotify.com/authorize?client_id=e76238c1f3c946448d99a02416d2586a&scope=user-read-email playlist-modify-private playlist-read-private&response_type=token&redirect_uri=http://localhost:3000`
  //   );
  // };

  // const handleInputForm = (e) => {
  //   const { name, value } = e.target;
  //   setForm({ ...form, [name]: value });
  //   // console.log(form, "form");
  // };

  // const getProfile = () => {
  //   axios
  //     .get(`https://api.spotify.com/v1/me?access_token=${token}`, {
  //       // headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((res) => {
  //       // console.log(res.data);
  //       setUser(res.data.display_name);
  //       setUserID(res.data.id);
  //     });
  // };

  // useEffect(() => {
  //   getProfile();
  // });

  // const addPlaylist = async (data) => {
  //   await axios
  //     .post(
  //       `https://api.spotify.com/v1/users/${userID}/playlists?access_token=${token}`,
  //       {
  //         ...data,
  //         public: false,
  //       }
  //     )
  //     .then(
  //       (res) =>
  //         //console.log(res.data.id, "playlist id")
  //         addTracktoPlaylist(res.data.id),
  //       setPlaylist([]),
  //       setListUri([]),
  //       setForm({})
  //     )
  //     .catch((err) => err.message);
  // };

  // const addTracktoPlaylist = (data) => {
  //   axios
  //     .post(
  //       `https://api.spotify.com/v1/playlists/${data}/tracks?access_token=${token}`,
  //       { uris: listUri }
  //     )
  //     .then((res) => console.log("ADD TRACK", res));
  // };

  // const handleSubmitForm = (e) => {
  //   e.preventDefault();
  //   addPlaylist(form);
  // };

  // const handleLogOut = () => {
  //   console.log("LogOut");
  //   dispatch(setToken(undefined));
  // };
  return (
    <>
      <div className="page-container">Playlist</div>
    </>
  );
};

export default PlaylistPage;
