import "./App.css";
import SearchPage from "./pages/home";
import Song from "./pages/home/song";
import ListTrack from "./pages/spotify";

function App() {
  return (
    <div className="App">
      {/* <SearchPage></SearchPage> */}
      {/* <Song></Song> */}
      <ListTrack className="layout"></ListTrack>
    </div>
  );
}

export default App;
