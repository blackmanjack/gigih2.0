import { ConvertMin, ConvertSec } from "../../utils/helper/ConvertMiliseconds";
import {
  ConvertString20,
  ConvertString40,
} from "../../utils/helper/ConvertString";
const Playlist = ({ index, handleSelect, playlist, ...item }) => {
  return (
    <>
      <div className="card-playlist">
        <div className="number">
          <p>{index + 1}</p>
        </div>
        <div>
          <img
            className="img-playlist"
            src={item.album.images[0].url}
            alt={item.album.name}
          ></img>
        </div>
        <div className="title-album">
          <p>{ConvertString40(item.name)}</p>
          <p>{ConvertString40(item.artists[0].name)}</p>
        </div>
        <div className="duration">
          <p>{`${ConvertMin(item.duration_ms)}:${ConvertSec(
            item.duration_ms
          )}`}</p>
        </div>
        <div className="button-playlist">
          <button onClick={() => handleSelect(item, item.uri)}>
            {playlist.some((data) => item.id === data.id)
              ? "Deselect"
              : "Select"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Playlist;
