import { useState } from "react";

const Filter = ({ handleTheLimit, theLimit }) => {
  // console.log(handleOption, "apa");
  // console.log(limit, "limit");
  const [limit, setLimit] = useState(10);
  const handleOption = (e) => {
    console.log(e.target.value, "ini apa=>");
    setLimit(e.target.value);
    // this.setState({ limit: e.target.value });
  };
  return (
    <>
      <div className="limit-box">
        <p>Limit</p>
        <select value={theLimit} onChange={handleTheLimit}>
          <option>10</option>
          <option>15</option>
          <option>20</option>
          <option>30</option>
        </select>
      </div>
    </>
  );
};

export default Filter;
