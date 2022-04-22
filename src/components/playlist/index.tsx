import { ConvertMin, ConvertSec } from "../../utils/helper/ConvertMiliseconds";
import { ConvertString40 } from "../../utils/helper/ConvertString";

import { RootObject } from "../../models";
import { Button } from "@mui/material";

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
          <div>{ConvertString40(data.name)}</div>
          <div>{ConvertString40(data.artists[0].name)}</div>
        </div>
        <div className="duration">
          <p>{`${ConvertMin(data.duration_ms)}:${ConvertSec(
            data.duration_ms
          )}`}</p>
        </div>
        <div className="button-playlist">
          {playlist.some((item) => data.id === item.id) ? (
            <>
              <div className="btn">
                <Button
                  className="btn"
                  variant="contained"
                  color="error"
                  style={{
                    // backgroundColor: "#FF5851",
                    maxWidth: "100px",
                    maxHeight: "50px",
                    minWidth: "50px",
                    minHeight: "30px",
                    fontSize: "12px",
                    borderRadius: 50,
                  }}
                  onClick={() => handleSelect(data, data.uri)}
                >
                  Deselect
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="btn">
                <Button
                  variant="contained"
                  style={{
                    maxWidth: "100px",
                    maxHeight: "50px",
                    minWidth: "50px",
                    minHeight: "30px",
                    fontSize: "12px",
                    borderRadius: 50,
                  }}
                  onClick={() => handleSelect(data, data.uri)}
                >
                  Select
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Playlist;
