import "./App.css";
import ListTrack from "./pages/spotify";
import { Provider } from "react-redux";
import store from "./utils/redux/store";
import SwitchRouter from "./Routes";

function App() {
  return (
    <>
      <Provider store={store}>
        <SwitchRouter />
        {/* <ListTrack className="layout"></ListTrack> */}
      </Provider>
    </>
  );
}

export default App;
