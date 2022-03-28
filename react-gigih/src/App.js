import "./App.css";
import SearchPage from "./pages/home";
import Song from "./pages/home/song";

function App() {
  return (
    <div className="App">
      <SearchPage></SearchPage>
      {/* <Song></Song> */}

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
