// import data from "./data";
import axios from "axios";
import SearchBar from "../../components/Search";
import { useState, useEffect, ChangeEvent } from "react";
import Playlist from "../../components/playlist";
import { useSelector, RootStateOrAny } from "react-redux";
import { Button } from "@mui/material";
import { RootObject } from "../../models";
import { Heading2, Heading3 } from "../../components/typography";

type Form = {
  name: string;
  description: string;
};

const ListTrack = () => {
  const token = useSelector((state: RootStateOrAny) => state.auth.token);

  const [form, setForm] = useState<Form>({
    name: "",
    description: "",
  });
  const [user, setUser] = useState("");
  const [userID, setUserID] = useState("");
  const [data, setData] = useState<RootObject[]>([]);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [playlist, setPlaylist] = useState<RootObject[]>([]);
  const [listUri, setListUri] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLimit(10);
    setSearch(e.target.value);
  };

  const handleInputForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    console.log(form, "form");
  };

  const handleLoadNewData = (data: number) => {
    setLimit(limit + data);
  };

  const addPlaylist = async (data: Form) => {
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

  const addTracktoPlaylist = (data: RootObject) => {
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
      const getData = async () => {
        await axios
          .get(
            "https://api.spotify.com/v1/search?q=" +
              search +
              "&type=track&access_token=" +
              token +
              "&limit=" +
              limit
          )
          .then((res) => {
            console.log("RESPONSE =>", res.data.tracks.items);
            setData(res.data.tracks.items);
          })
          .catch((error) => error.message);
      };
      getData();
    } else if (search === "") {
      setData([]);
    }
    const getProfile = () => {
      axios
        .get(`https://api.spotify.com/v1/me?access_token=${token}`)
        .then((res) => {
          // console.log(res.data);
          setUser(res.data.display_name);
          setUserID(res.data.id);
        });
    };
    getProfile();
  }, [token, limit, search]);

  const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    addPlaylist(form);
  };

  const handleSelect = (data: RootObject, uri: string) => {
    // console.log(uri, "selected uri");
    //if data in playlist === false
    //add new data to playlist
    if (playlist.some((item: RootObject) => data.id === item.id) === false) {
      setListUri((prevUri) => [...prevUri, uri]);
      setPlaylist((prevData) => {
        const newA = [...prevData, data];
        return newA;
      });
    }
    //if data is already in playlist
    //erase data from list
    else {
      let newArray = playlist.filter((item: RootObject) => item.id !== data.id);
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
          {/* <Filter handleTheLimit={handleTheLimit} theLimit={theLimit}></Filter> */}
          <div className="layout playlist">
            <div className="wrapper-content">
              <div className="layout-item">
                <Heading2>Create Playlist</Heading2>
                <form className="form-playlist" onSubmit={handleSubmitForm}>
                  <label htmlFor="name"></label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    // value={playlistName}
                    onChange={handleInputForm}
                    placeholder="Your Playlist Name"
                    minLength={10}
                    required
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
                  <button className="btn-playlist">Add Playlist</button>
                </form>
                <div className="list-playlist">
                  <Heading3>Selected Song</Heading3>
                  {(playlist || []).map((item, index: number) => (
                    <Playlist
                      key={item.id}
                      index={index}
                      handleSelect={handleSelect}
                      playlist={playlist}
                      data={item}
                    />
                  ))}
                </div>
              </div>
              <div className="layout-item">
                <Heading2>Search Result</Heading2>
                {/* flexbox */}
                <div className="list-playlist">
                  {(data || []).map((item, index: number) => (
                    <Playlist
                      key={item.id}
                      index={index}
                      handleSelect={handleSelect}
                      // listUri={listUri}
                      playlist={playlist}
                      data={item}
                    ></Playlist>
                  ))}
                </div>
              </div>
            </div>
            <div className="btn-loadMore">
              {search.length !== 0 && (
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#1db954",
                    borderRadius: 50,
                    color: "#000",
                  }}
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
