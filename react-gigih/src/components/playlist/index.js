import { ConvertMin, ConvertSec } from "../../utils/helper/ConvertMiliseconds";
const Playlist = ({ index, ...item }) => {
  return (
    <>
      <div className="card-playlist">
        <div>
          <p>{index + 1}</p>
        </div>
        <div>
          <img
            className="img-playlist"
            src={item.album.images[0].url}
            alt={item.album.name}
          ></img>
        </div>
        <div>
          <p>{item.name}</p>
        </div>
        <div>
          <p>{`${ConvertMin(item.duration_ms)}:${ConvertSec(
            item.duration_ms
          )}`}</p>
        </div>
        <div>{/* <button onClick={handleSelect()}>delte</button> */}</div>
      </div>
    </>
  );
};

export default Playlist;
