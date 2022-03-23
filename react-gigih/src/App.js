import logo from "./logo.svg";
import "./App.css";
import SearchPage from "./pages/home";
import { Album } from "./pages/home/album";

function App() {
  return (
    <div className="App">
      {/* <SearchPage></SearchPage> */}
      <Album></Album>
      {/* <div className="container">
        <div className="search">
          <input type="search"></input>
          <button id="btn-seacrh">search</button>
        </div>
        <img src="https://media.giphy.com/media/Vh8pbGX3SGRwFDh3V0/source.gif"></img>
      </div> */}
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
