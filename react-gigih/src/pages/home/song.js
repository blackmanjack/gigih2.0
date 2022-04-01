import Track from "../../components/Track";
import { ConvertMin, ConvertSec } from "../../helper/ConvertMiliseconds";
import { dataAlbum } from "./data";
// console.log(dataAlbum.album.images[0]);
const Song = () => {
  let duration_s = ConvertSec(dataAlbum.duration_ms);
  let duration_m = ConvertMin(dataAlbum.duration_ms);
  // console.log(dataAlbum.artists);
  return (
    <>
      <Track
        imageURL={dataAlbum.album.images[0].url}
        album={dataAlbum.album.name}
        title={dataAlbum.name}
        artist={dataAlbum.artists[0].name}
        min={duration_m}
        sec={duration_s}
      ></Track>
    </>
  );
};

export default Song;
