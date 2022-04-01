// import data from "./data";
import axios from "axios";
import Track from "../../components/Track";
import { ConvertMin, ConvertSec } from "../../helper/ConvertMiliseconds";
import SearchBar from "../../components/Search";
import { Component } from "react";

// const ListTrack = () => {
//   console.log(data, "dataSpotify");
//   return (
//     <>
//       <div className="page-container">
//         <SearchBar></SearchBar>
//         <div className="list-item">
//           {data.map((item) => (
//             <Track
//               imageURL={item.album.images[0].url}
//               album={item.album.name}
//               title={item.name}
//               artist={item.artists[0].name}
//               min={ConvertMin(item.duration_ms)}
//               sec={ConvertSec(item.duration_ms)}
//             ></Track>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ListTrack;

export default class ListTrack extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    token: window.location.hash
      .substring(1, window.location.hash.length - 1)
      .split("&")[0]
      .split("=")[1],
    isLogin: false,
    data: [],
    search: "",
    limit: "10",
  };

  handleLogin = () => {
    //console.log(process.env.REACT_APP_SPOTIFY_CLIENT_ID, "clientID");
    window.open(
      `https://accounts.spotify.com/authorize?client_id=e76238c1f3c946448d99a02416d2586a&response_type=token&redirect_uri=http://localhost:3000`
    );
    // window.open(
    //   `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000`
    // );
    this.setState({ isLogin: true });
    console.log(this.token, "token");
  };

  handleChange = (e) => {
    // console.log(e.target.value);
    this.setState({
      search: e.target.value,
    });
    // console.log(this.state.search, "search");
  };

  handleOption = (e) => {
    this.setState({ limit: e.target.value });
  };

  getData = () => {
    fetch(
      "https://api.spotify.com/v1/search?q=" +
        this.state.search +
        "&type=track&access_token=" +
        this.state.token +
        "&limit=" +
        this.state.limit
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        this.setState({
          data: data.tracks.items,
        });
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.getData();
  };

  render() {
    return (
      <>
        <div className="page-container">
          {this.state.token !== undefined ? (
            <>
              <SearchBar
                query={this.state.search}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
              ></SearchBar>
              {/* <div className="search-box">
                <input
                  value={this.state.search}
                  onChange={this.handleChange}
                  placeholder="Search Song"
                />

                <button onClick={this.handleSubmit}>Search</button>
              </div> */}
              <div className="limit-box">
                <p>Limit</p>
                <select value={this.state.limit} onChange={this.handleOption}>
                  <option>10</option>
                  <option>15</option>
                  <option>20</option>
                  <option>30</option>
                </select>
              </div>

              <div className="list-item">
                {this.state.data.map((item) => (
                  <Track
                    key={item.id}
                    imageURL={item.album.images[0].url}
                    album={item.album.name}
                    title={item.name}
                    artist={item.artists[0].name}
                    min={ConvertMin(item.duration_ms)}
                    sec={ConvertSec(item.duration_ms)}
                  ></Track>
                ))}
              </div>
            </>
          ) : (
            <>
              <h1>Hello, Stranger</h1>
              <button onClick={() => this.handleLogin()}>Login</button>
            </>
          )}
        </div>
      </>
    );
  }
}
