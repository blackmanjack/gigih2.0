import { Input, TextField } from "@mui/material";

const SearchBar = ({ user, query, handleChange }) => {
  return (
    <>
      <div className="search">
        <TextField
          variant="filled"
          className="bg-white"
          type="search"
          value={query}
          onChange={handleChange}
          placeholder="Search Song"
        ></TextField>
        {/* <p>{user}</p> */}
        {/* <button id="btn-seacrh" onClick={handleSubmit}>
          search
        </button> */}
      </div>
    </>
  );
};

export default SearchBar;
