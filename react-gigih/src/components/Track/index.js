import { useState } from "react";

const Track = ({
  playlist,
  handleSelect,
  uri,
  imageURL,
  album,
  title,
  artist,
  min,
  sec,
}) => {
  // const [select, setSelect] = useState(false);
  // const [songSelect, setSongSelect] = useState([]);

  // const handleSelect = (idd) => {
  //   // event.preventDefault();
  //   console.log("select", idd);
  //   setSelect((select)=>{
  //     if(select == false) {
  //       setSelect(true)

  //     }
  //   })
  //   // setSelect(true);
  //   // if (select === true) {
  //   //   songSelect.push(...Track(idd));
  //   //   console.log(songSelect, "ini array apa");
  //   // }
  // };

  return (
    <>
      <div className="container">
        <div className="card-album">
          <img src={imageURL} alt={album}></img>
          <div id="text">
            <h1>{title}</h1>
            <p>{artist}</p>
            <p>{`${min} min ${sec} sec`}</p>
            <h2>{album}</h2>
            <button onClick={() => handleSelect(uri)}>
              {playlist.includes(uri) ? "Deselect" : "Select"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Track;
