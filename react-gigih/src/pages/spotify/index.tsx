// import data from "./data";
import axios from "axios";
import Track from "../../components/Track";
import SearchBar from "../../components/Search";
import { useState, useEffect, SetStateAction, ChangeEvent } from "react";
import Playlist from "../../components/playlist";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { setToken } from "../../utils/redux/tokenSlice";
import Filter from "../../components/filter";
import Loginpage from "../Login";
import { Button } from "@mui/material";

interface Playlist {
  urlImage: string;
  name: string;
  artist: string;
  duration_ms: string;
  album_name: string;
  uri: string;
}

const ListTrack = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootStateOrAny) => state.auth.token);
  const [form, setForm] = useState({});
  const [user, setUser] = useState("");
  const [userID, setUserID] = useState("");
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [playlist, setPlaylist] = useState([]);
  const [listUri, setListUri] = useState([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLimit(10);
    setSearch(e.target.value);
  };

  const handleInputForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    console.log(form, "form");
  };

  // const handleOption = (event: ChangeEvent<HTMLSelectElement>) => {
  //   console.log("value", event.target.value);
  //   setLimit(event.target.value);
  // };
  const handleLoadNewData = (data: number) => {
    setLimit(limit + data);
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

  const addPlaylist = async (data: any) => {
    await axios
      .post(
        `https://api.spotify.com/v1/users/${userID}/playlists?access_token=${token}`,
        {
          ...data,
          public: false,
        }
      )
      .then((res) =>
        //console.log(res.data.id, "playlist id")
        addTracktoPlaylist(res.data.id)
      )
      .catch((err) => err.message);
  };

  const addTracktoPlaylist = (data: any) => {
    axios
      .post(
        `https://api.spotify.com/v1/playlists/${data}/tracks?access_token=${token}`,
        { uris: listUri }
      )
      .then(() => setPlaylist([]))
      .then(() => setListUri([]));
  };

  useEffect(() => {
    if (search !== "") {
      getData();
    } else if (search == "") {
      setData([]);
    }
    getProfile();
  }, [limit, search]);

  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    addPlaylist(form);
  };

  const handleSelect = (data: any, uri: any) => {
    // console.log(uri, "selected uri");
    //if data in playlist === false
    //add new data to playlist
    if (playlist.some((item: any) => data.id === item.id) === false) {
      setListUri((prevUri): any => [...prevUri, uri]);
      setPlaylist((prevData): any => {
        const newA = [...prevData, data];
        return newA;
      });
    }
    //if data is already in playlist
    //erase data from list
    else {
      let newArray = playlist.filter((item: any) => item.id !== data.id);
      let newUri = listUri.filter((data) => data !== uri);
      setPlaylist(newArray);
      setListUri(newUri);
    }
  };

  return (
    <>
      <div className="page-container">
        <>
          {/* <button onClick={() => handleLogOut()}>LogOut</button> */}
          <SearchBar
            query={search}
            user={user}
            // handleSubmit={handleSubmit}
            handleChange={handleChange}
          />

          <div className="layout playlist">
            <div className="wrapper-content">
              <div className="layout-item">
                <h1>Create Playlist</h1>
                <form onSubmit={handleSubmitForm}>
                  <label htmlFor="name"></label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    // value={playlistName}
                    onChange={handleInputForm}
                    placeholder="Your Playlist Name"
                    minLength={10}
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
                  <h2>Selected Song</h2>
                  {playlist.map((item: any, index) => (
                    <Playlist
                      key={item.id}
                      index={index}
                      handleSelect={handleSelect}
                      playlist={playlist}
                      {...item}
                    />
                  ))}
                </div>
              </div>
              <div className="layout-item">
                <h1>Search result</h1>
                {/* flexbox */}
                <div className="list-playlist">
                  {data.map((item: any, index) => (
                    <Playlist
                      key={item.id}
                      index={index}
                      handleSelect={handleSelect}
                      // listUri={listUri}
                      playlist={playlist}
                      {...item}
                    ></Playlist>
                  ))}
                </div>
              </div>
            </div>
            <div className="btn-loadMore">
              {search.length !== 0 && (
                <Button
                  variant="contained"
                  onClick={() => handleLoadNewData(10)}
                >
                  more songs
                </Button>
              )}
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default ListTrack;
