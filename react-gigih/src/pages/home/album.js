import data from "./data";
console.log(data.album.images[0]);
export const Album = () => {
  let duration_s = data.duration_ms / 1000;
  const duration_m = parseInt(duration_s / 60);
  duration_s = parseInt(duration_s % 60);

  return (
    <>
      <div className="container">
        <div className="card-album">
          <img src={data.album.images[0].url}></img>
          <div className="text">
            <h1>{data.album.name}</h1>
            <h2>{data.name}</h2>
            <p>
              {data.artists[0].name + ` • ${duration_m} min ${duration_s} sec`}
            </p>
            <button>select</button>
          </div>
        </div>
      </div>
    </>
  );
};
