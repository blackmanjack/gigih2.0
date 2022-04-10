// import data from "./data";
import axios from "axios";
import Track from "../../components/Track";
import SearchBar from "../../components/Search";
import { useState, useEffect } from "react";
import Playlist from "../../components/playlist";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../../utils/tokenSlice";

const ListTrack = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  // const [token, setToken] = useState(
  //   window.location.hash
  //     .substring(1, window.location.hash.length - 1)
  //     .split("&")[0]
  //     .split("=")[1]
  // );
  const [playlistName, setPlaylistName] = useState("");
  const [descPlaylist, setDescPlaylist] = useState("");
  const [user, setUser] = useState("");
  const [userID, setUserID] = useState("");
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [playlist, setPlaylist] = useState([]);
  const [listUri, setListUri] = useState([]);

  const handleLogin = () => {
    //console.log(process.env.REACT_APP_SPOTIFY_CLIENT_ID, "clientID");
    window.open(
      `https://accounts.spotify.com/authorize?client_id=e76238c1f3c946448d99a02416d2586a&scope=user-read-email playlist-modify-private playlist-read-private&response_type=token&redirect_uri=http://localhost:3000`
    );
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleChangePlaylist = (e) => {
    // console.log(e.target.value);
    setPlaylistName(e.target.value);
  };

  const handleChangeDescPlaylist = (e) => {
    // console.log(e.target.value);
    setDescPlaylist(e.target.value);
  };

  const handleOption = (e) => {
    setLimit(e.target.value);
    // this.setState({ limit: e.target.value });
  };
  const getData = () => {
    fetch(
      "https://api.spotify.com/v1/search?q=" +
        search +
        "&type=track&access_token=" +
        token +
        "&limit=" +
        limit
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setData(data.tracks.items);
      })
      .catch((error) => error.message);
  };

  const getProfile = () => {
    axios
      .get(`https://api.spotify.com/v1/me?access_token=${token}`, {
        // headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // console.log(res.data);
        setUser(res.data.display_name);
        setUserID(res.data.id);
      });
  };

  const addPlaylist = async () => {
    await axios
      .post(
        `https://api.spotify.com/v1/users/${userID}/playlists?access_token=${token}`,
        {
          name: playlistName,
          description: descPlaylist,
          public: false,
        }
      )
      .then(
        (res) =>
          //console.log(res.data.id, "playlist id")
          addTracktoPlaylist(res.data.id)

        // addTracktoPlaylist(idPlaylist)
      )
      .catch((err) => err.message);
  };

  const addTracktoPlaylist = (data) => {
    axios
      .post(
        `https://api.spotify.com/v1/playlists/${data}/tracks?access_token=${token}`,
        { uris: listUri }
      )
      .then((res) => console.log("ADD TRACK", res));
  };

  useEffect(() => {
    addPlaylist();
  }, []);

  useEffect(() => {
    // getAuthKey();
    getData();
    getProfile();
  }, [limit, search]);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // getData();
  //   // addPlaylist();
  // };

  const handleSelect = (data, uri) => {
    // console.log(uri, "selected uri");
    //if data in playlist === false
    //add new data to playlist
    if (playlist.some((item) => data.name === item.name) === false) {
      setListUri((prevUri) => [...prevUri, uri]);
      setPlaylist((prevData) => {
        const newA = [...prevData, data];
        return newA;
      });
    }
    //if data is already in playlist
    //erase data from list
    else {
      let newArray = playlist.filter((item) => item.id !== data.id);
      let newUri = listUri.filter((data) => data !== uri);
      setPlaylist(newArray);
      setListUri(newUri);
    }
  };

  // const getUserPlaylist = async () => {
  //   await axios.get(
  //     `https://api.spotify.com/v1/me/playlists?access_token=${token}`
  //   );
  //   // .then((res) => console.log(res.data.items, "playlist aing"));
  // };
  // useEffect(() => {
  //   if (token) {
  //     getUserPlaylist();
  //   }
  // }, [token]);
  // console.log(playlistName, descPlaylist);
  // console.log(playlist, "playlist");
  // console.log("LIST URI", listUri);
  // console.log(userID);

  const handleLogOut = () => {
    console.log("LogOut");
    dispatch(setToken(undefined));
  };
  // console.log(listUserPlaylist, "Myplaylist");
  // console.log(token, "token");
  return (
    <>
      <div className="page-container">
        {token !== undefined ? (
          <>
            <button onClick={() => handleLogOut()}>LogOut</button>
            <SearchBar
              query={search}
              user={user}
              // handleSubmit={handleSubmit}
              handleChange={handleChange}
            />

            <div className="limit-box">
              <p>Limit</p>
              <select value={limit} onChange={handleOption}>
                <option>10</option>
                <option>15</option>
                <option>20</option>
                <option>30</option>
              </select>
            </div>

            <div className="layout playlist">
              <form onSubmit={() => addPlaylist()}>
                <label htmlFor="playlistName"></label>
                <input
                  id="playlistName"
                  type="text"
                  value={playlistName}
                  onChange={handleChangePlaylist}
                  placeholder="Your Playlist Name"
                  minLength="10"
                ></input>
                <label htmlFor="descPlaylist"></label>
                <input
                  id="descPlaylist"
                  type="text"
                  value={descPlaylist}
                  onChange={handleChangeDescPlaylist}
                  placeholder="Description Playlist"
                ></input>
                <button>submit</button>
              </form>
              <div className="list-playlist">
                {playlist.map((item, index) => (
                  <Playlist key={item.id} index={index} {...item} />
                ))}
                {}
              </div>
            </div>

            <div className="list-item">
              {data.map((item) => (
                <Track
                  key={item.id}
                  handleSelect={handleSelect}
                  playlist={playlist}
                  {...item}
                ></Track>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="container">
              <div className="login-page">
                <h1>Hello, Stranger</h1>
                <button onClick={() => handleLogin()}>Login</button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ListTrack;
