const Filter = (limit, handleOption) => {
  return (
    <>
      <div className="limit-box">
        <p>Limit</p>
        <select value={limit} onChange={handleOption}>
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
