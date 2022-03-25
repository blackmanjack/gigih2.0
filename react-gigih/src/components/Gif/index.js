const Gif = ({ title, url }) => {
  return (
    <>
      <div>
        <h3>{title}</h3>
        <img src={url}></img>
      </div>
    </>
  );
};

export default Gif;
