import "./App.css";
import ListTrack from "./pages/spotify";
import { Provider } from "react-redux";
import store from "./utils/redux/store";

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
