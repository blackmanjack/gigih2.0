import { Button } from "@mui/material";
import { ConvertMin, ConvertSec } from "../../utils/helper/ConvertMiliseconds";
import { ItemTrack } from "../../models";

// interface Playlist {
//   urlImage: string;
//   name: string;
//   artists: string;
//   duration_ms: string;
//   album_name: string;
//   uri: string;
//   handleSelect: string;
//   playlist: string;
// }
// type Props = {
//   data: ItemTrack[];
//   handleSelect: (data: string) => void;
//   selectedData: string[];
// };

const Track = ({ handleSelect, playlist, ...item }) => {
  return (
    <>
      <div className="container">
        <div className="card-playlist">
          <img
            className="img-playlist"
            src={item.album.images[0].url}
            alt={item.album.name}
          ></img>
          <div id="text">
            <h1>{item.name}</h1>
            <p>{item.artists[0].name}</p>
            <p>{`${ConvertMin(item.duration_ms)} min ${ConvertSec(
              item.duration_ms
            )} sec`}</p>
            <h2>{item.album.name}</h2>
            <Button
              variant="contained"
              onClick={() => handleSelect(item, item.uri)}
            >
              {playlist.some((data) => item.id === data.id)
                ? "Deselect"
                : "Select"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Track;
