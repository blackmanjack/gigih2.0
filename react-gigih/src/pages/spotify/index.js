// import data from "./data";
import Track from "../../components/Track";
import { ConvertMin, ConvertSec } from "../../helper/ConvertMiliseconds";
import SearchBar from "../../components/Search";
import { useState, useEffect } from "react";

const ListTrack = () => {
  const [token, setToken] = useState(
    window.location.hash
      .substring(1, window.location.hash.length - 1)
      .split("&")[0]
      .split("=")[1]
  );
  const [isLogin, setIsLogin] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [select, setSelect] = useState(false);
  const [playlist, setPlaylist] = useState([]);

  const handleLogin = () => {
    //console.log(process.env.REACT_APP_SPOTIFY_CLIENT_ID, "clientID");
    window.open(
      `https://accounts.spotify.com/authorize?client_id=e76238c1f3c946448d99a02416d2586a&response_type=token&redirect_uri=http://localhost:3000`
    );
    // window.open(
    //   `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000`
    // );

    setIsLogin(true);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
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
      });
  };

  useEffect(() => {
    getData();
  }, [limit, search]);

  const handleSubmit = (event) => {
    event.preventDefault();
    getData();
  };

  const handleSelect = (data) => {
    // console.log(playlist.includes(data), "playlist");
    if (playlist.includes(data)) {
      const findIndex = playlist.findIndex((i) => i === data);
      setPlaylist((prevData) => {
        const newArr = [
          ...prevData.slice(0, findIndex),
          ...prevData.slice(findIndex + 1, prevData.length),
        ];
        return newArr;
      });
    } else {
      setPlaylist((prevData) => {
        const newA = [...prevData, data];
        return newA;
        // console.log(newA, "test");
      });
    }
  };
  console.log(playlist, "playlist");
  return (
    <>
      <div className="page-container">
        {token !== undefined ? (
          <>
            <SearchBar
              query={search}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
            ></SearchBar>
            <div className="limit-box">
              <p>Limit</p>
              <select value={limit} onChange={handleOption}>
                <option>10</option>
                <option>15</option>
                <option>20</option>
                <option>30</option>
              </select>
            </div>

            <div className="list-item">
              {data.map((item) => (
                <Track
                  key={item.id}
                  uri={item.uri}
                  imageURL={item.album.images[0].url}
                  album={item.album.name}
                  title={item.name}
                  artist={item.artists[0].name}
                  min={ConvertMin(item.duration_ms)}
                  sec={ConvertSec(item.duration_ms)}
                  handleSelect={handleSelect}
                  playlist={playlist}
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

// export default class ListTrack extends Component {
//   constructor(props) {
//     super(props);
//   }

//   state = {
//     token: window.location.hash
//       .substring(1, window.location.hash.length - 1)
//       .split("&")[0]
//       .split("=")[1],
//     isLogin: false,
//     data: [],
//     search: "",
//     limit: "10",
//     select: false,
//     fav: [],
//   };

//   render() {
//     return (
//       <>
//         <div className="page-container">
//           {this.state.token !== undefined ? (
//             <>
//               <SearchBar
//                 query={this.state.search}
//                 handleSubmit={this.handleSubmit}
//                 handleChange={this.handleChange}
//               ></SearchBar>
//               <div className="limit-box">
//                 <p>Limit</p>
//                 <select value={this.state.limit} onChange={this.handleOption}>
//                   <option>10</option>
//                   <option>15</option>
//                   <option>20</option>
//                   <option>30</option>
//                 </select>
//               </div>

//               <div className="list-item">
//                 {this.state.data.map((item) => (
//                   <Track
//                     key={item.id}
//                     idd={item.id}
//                     imageURL={item.album.images[0].url}
//                     album={item.album.name}
//                     title={item.name}
//                     artist={item.artists[0].name}
//                     min={ConvertMin(item.duration_ms)}
//                     sec={ConvertSec(item.duration_ms)}
//                     handleSelect={this.handleSelect}
//                     select={this.state.select}
//                   ></Track>
//                 ))}
//               </div>
//             </>
//           ) : (
//             <>
//               <div className="container">
//                 <div className="login-page">
//                   <h1>Hello, Stranger</h1>
//                   <button onClick={() => this.handleLogin()}>Login</button>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </>
//     );
//   }
// }
