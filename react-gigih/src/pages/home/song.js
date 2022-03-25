import Track from "../../components/Track";
import { ConvertMin, ConvertSec } from "../../helper/ConvertMiliseconds";
import data from "./data";
console.log(data.album.images[0]);
const Song = () => {
  let duration_s = ConvertSec(data.duration_ms);
  let duration_m = ConvertMin(data.duration_ms);
  console.log(data.artists);
  return (
    <>
      <Track
        imageURL={data.album.images[0].url}
        album={data.album.name}
        title={data.name}
        artist={data.artists[0].name}
        min={duration_m}
        sec={duration_s}
      ></Track>
    </>
  );
};

export default Song;
