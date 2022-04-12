import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { ConvertString20 } from "../../utils/helper/ConvertString";
// import Track from "../../components/Track";

const Home = () => {
  const [data, setData] = useState([]);
  // const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const getNewRelease = () => {
    axios
      .get(
        `https://api.spotify.com/v1/browse/new-releases?access_token=${token}`,
        {
          // headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        // console.log(res.data.albums.items);
        setData(res.data.albums.items);
      });
  };

  useEffect(() => {
    if (data.length === 0) {
      getNewRelease();
    }
    console.log(data, "data");
  }, [data]);

  return (
    <>
      <div className="container">
        <h1>New Release</h1>
        {data.length !== 0 && (
          //flexbox
          <div className="list-release">
            {data.map((item) => (
              //grid
              <div key={item.id} className="card-release">
                <img src={item.images[0].url}></img>
                <div className="text-card">
                  <div>
                    <p className="item-name">{ConvertString20(item.name)}</p>
                  </div>
                  <div>
                    <p className="artist-name">{item.artists[0].name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* {data.map((item) => (
          <Track
            key={item.id}
            handleSelect={handleSelect}
            // listUri={listUri}
            playlist={playlist}
            {...item}
          ></Track>
        ))} */}
      </div>
    </>
  );
};

export default Home;
