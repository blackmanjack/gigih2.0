import data from "./data";
import Track from "../../components/Track";
import { ConvertMin, ConvertSec } from "../../helper/ConvertMiliseconds";

const ListTrack = () => {
  console.log(data, "dataSpotify");
  return (
    <>
      <div className="page-container">
        <div className="list-item">
          {data.map((item) => (
            <Track
              imageURL={item.album.images[0].url}
              album={item.album.name}
              title={item.name}
              artist={item.artists[0].name}
              min={ConvertMin(item.duration_ms)}
              sec={ConvertSec(item.duration_ms)}
            ></Track>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListTrack;
