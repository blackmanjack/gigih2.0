const SearchBar = ({ user, query, handleChange }) => {
  return (
    <>
      <div className="search">
        <input
          type="search"
          value={query}
          onChange={handleChange}
          placeholder="Search Song"
        ></input>
        <p>{user}</p>
        {/* <button id="btn-seacrh" onClick={handleSubmit}>
          search
        </button> */}
      </div>
    </>
  );
};

export default SearchBar;
