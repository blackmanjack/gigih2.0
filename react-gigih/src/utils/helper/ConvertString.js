const ConvertString20 = (string) => {
  if (string.length >= 20) {
    return string.substring(0, 20) + "...";
  } else return string;
};

export { ConvertString20 };
