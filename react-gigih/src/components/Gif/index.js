const Gif = ({ title, url }) => {
  return (
    <>
      <div>
        <h3>{title}</h3>
        <img src={url} alt={title}></img>
      </div>
    </>
  );
};

export default Gif;
