const Track = ({ imageURL, album, title, artist, min, sec }) => {
  return (
    <>
      <div className="container">
        <div className="card-album">
          <img src={imageURL} alt={album}></img>
          <div className="text">
            <h1>{title}</h1>
            <p>{artist}</p>
            <p>{`${min} min ${sec} sec`}</p>
            <h2>{album}</h2>
            <button>select</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Track;
