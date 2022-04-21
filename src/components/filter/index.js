const Filter = ({ handleTheLimit, theLimit }) => {
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
