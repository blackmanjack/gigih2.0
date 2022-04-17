import { Button } from "@mui/material";
import { ConvertMin, ConvertSec } from "../../utils/helper/ConvertMiliseconds";

const Track = ({ handleSelect, playlist, ...item }) => {
  return (
    <>
      <div className="container">
        <div className="card-album">
          <img src={item.album.images[0].url} alt={item.album.name}></img>
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
