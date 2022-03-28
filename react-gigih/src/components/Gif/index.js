const Gif = ({ title, url, rating }) => {
  return (
    <>
      <div className="container">
        <div className="card-album">
          <img src={url} alt={title}></img>
          <div className="text">
            <h1>{title}</h1>
            <p>{rating}</p>
            {/* <button>select</button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Gif;
