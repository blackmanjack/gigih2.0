import { ConvertMin, ConvertSec } from "../../utils/helper/ConvertMiliseconds";
import { ConvertString40 } from "../../utils/helper/ConvertString";

import { RootObject } from "../../models";

type PlaylistProps = {
  index: number;
  handleSelect: (data: RootObject, uri: string) => void;
  playlist: Array<RootObject>;
  data: RootObject;
};

const Playlist = ({ index, handleSelect, playlist, data }: PlaylistProps) => {
  return (
    <>
      <div className="card-playlist">
        <div className="number">
          <p>{index + 1}</p>
        </div>
        <div>
          <img
            className="img-playlist"
            src={data.album.images[0].url}
            alt={data.album.name}
          ></img>
        </div>
        <div className="title-album">
          <p>{ConvertString40(data.name)}</p>
          <p>{ConvertString40(data.artists[0].name)}</p>
        </div>
        <div className="duration">
          <p>{`${ConvertMin(data.duration_ms)}:${ConvertSec(
            data.duration_ms
          )}`}</p>
        </div>
        <div className="button-playlist">
          <button onClick={() => handleSelect(data, data.uri)}>
            {playlist.some((item) => data.id === item.id)
              ? "Deselect"
              : "Select"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Playlist;
