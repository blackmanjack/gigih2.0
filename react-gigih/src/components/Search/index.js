// const SearchBar = ({ query, handleChange, handleSubmit }) => {
//   return (
//     <>
//       <div className="search">
//         <input
//           type="search"
//           value={query}
//           onChange={handleChange}
//           placeholder="Search Song"
//         ></input>
//         <button id="btn-seacrh" onClick={handleSubmit}>
//           search
//         </button>
//       </div>
//     </>
//   );
// };

import { Component } from "react";

class SearchBar extends Component {
  render() {
    return (
      <>
        <div className="search">
          <input
            type="search"
            value={this.props.query}
            onChange={this.props.handleChange}
            placeholder="Search Song"
          ></input>
          <button id="btn-seacrh" onClick={this.props.handleSubmit}>
            search
          </button>
        </div>
      </>
    );
  }
}

export default SearchBar;
