import { useState } from "react";

const Filter = (limit, handleOption) => {
  console.log(handleOption, "apa");
  console.log(limit, "limit");
  // const [limit, setLimit] = useState(10);
  // const handleOption = (e) => {
  //   console.log(e.target.value, "ini apa=>");
  //   setLimit(e.target.value);
  //   // this.setState({ limit: e.target.value });
  // };
  return (
    <>
      <div className="limit-box">
        <p>Limit</p>
        <select value={limit} onChange={handleOption}>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div>
    </>
  );
};

export default Filter;
