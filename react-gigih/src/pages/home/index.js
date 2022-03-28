import Gif from "../../components/Gif";
import SearchBar from "../../components/Search";
import { dataGif } from "./data";
import { useState } from "react";
import FilterCategory from "../../components/Filter";

const SearchPage = () => {
  const [filter, setFilter] = useState("");

  const filterData = dataGif.filter((data) => data.rating === filter);

  console.log(filterData, "data g");
  console.log("dataGIF", dataGif);
  return (
    <>
      <div className="container">
        <SearchBar></SearchBar>
        <FilterCategory></FilterCategory>
        <div className="list-item">
          {dataGif.map((data) => (
            <Gif key={data.id} {...data} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
