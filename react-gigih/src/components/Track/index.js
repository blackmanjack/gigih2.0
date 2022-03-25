const Track = ({ imageURL, album, title, artist, min, sec }) => {
  return (
    <>
      <div className="container">
        <div className="card-album">
          <img src={imageURL} alt={album}></img>
          <div className="text">
            <h1>{album}</h1>
            <h2>{title}</h2>
            <p>{artist + ` • ${min} min ${sec} sec`}</p>
            <button>select</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Track;
