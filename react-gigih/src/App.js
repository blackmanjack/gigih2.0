import "./App.css";
import SearchPage from "./pages/home";
import Song from "./pages/home/song";
import ListTrack from "./pages/spotify";
import { Provider } from "react-redux";
import store from "./utils/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <ListTrack className="layout"></ListTrack>
      </Provider>
    </>
  );
}

export default App;
