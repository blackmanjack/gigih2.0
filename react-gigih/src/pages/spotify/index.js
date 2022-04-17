// import data from "./data";
import axios from "axios";
import Track from "../../components/Track";
import SearchBar from "../../components/Search";
import { useState, useEffect } from "react";
import Playlist from "../../components/playlist";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../../utils/redux/tokenSlice";
import Filter from "../../components/filter";
import Loginpage from "../Login";
import { Button } from "@mui/material";

const ListTrack = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [form, setForm] = useState({});
  const [user, setUser] = useState("");
  const [userID, setUserID] = useState("");
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [playlist, setPlaylist] = useState([]);
  const [listUri, setListUri] = useState([]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleInputForm = (e) => {
    const { name, value } = e.target;
    // console.log(name, "nameForm");
    // console.log(value, "valueForm");
    setForm({ ...form, [name]: value });
    console.log(form, "form");
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
        console.log(data);
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

  const addPlaylist = async (data) => {
    // console.log(form, "form");
    // console.log(formData, "formData");
    await axios
      .post(
        `https://api.spotify.com/v1/users/${userID}/playlists?access_token=${token}`,
        {
          ...data,
          // name: playlistName,
          // description: descPlaylist,
          public: false,
        }
      )
      .then(
        (res) =>
          //console.log(res.data.id, "playlist id")
          addTracktoPlaylist(res.data.id),
        setPlaylist([]),
        setListUri([]),
        setForm({})
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
    if (search !== "") {
      getData();
    }
    getProfile();
  }, [limit, search]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    addPlaylist(form);
  };

  const handleSelect = (data, uri) => {
    // console.log(uri, "selected uri");
    //if data in playlist === false
    //add new data to playlist
    if (playlist.some((item) => data.id === item.id) === false) {
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

  const handleLogOut = () => {
    console.log("LogOut");
    dispatch(setToken(undefined));
  };
  return (
    <>
      <div className="page-container">
        {token !== undefined ? (
          <>
            {/* <button onClick={() => handleLogOut()}>LogOut</button> */}
            <SearchBar
              query={search}
              user={user}
              // handleSubmit={handleSubmit}
              handleChange={handleChange}
            />

            <Filter limit={limit} handleChange={handleOption} />

            <div className="layout playlist">
              <form onSubmit={handleSubmitForm}>
                <label htmlFor="name"></label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  // value={playlistName}
                  onChange={handleInputForm}
                  placeholder="Your Playlist Name"
                  minLength="10"
                ></input>
                <label htmlFor="description"></label>
                <input
                  id="description"
                  name="description"
                  type="text"
                  // value={descPlaylist}
                  onChange={handleInputForm}
                  placeholder="Your Description"
                ></input>
                <button>submit</button>
              </form>
              <div className="list-playlist">
                {playlist.map((item, index) => (
                  <Playlist key={item.id} index={index} {...item} />
                ))}
              </div>
            </div>
            {/* flexbox */}
            <div className="list-item">
              {data.map((item) => (
                <Track
                  key={item.id}
                  handleSelect={handleSelect}
                  // listUri={listUri}
                  playlist={playlist}
                  {...item}
                ></Track>
              ))}
            </div>
          </>
        ) : (
          <>
            <Loginpage />
          </>
        )}
      </div>
    </>
  );
};

export default ListTrack;
