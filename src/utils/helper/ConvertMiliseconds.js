const ConvertSec = (miliseconds) => {
  let duration_s = miliseconds / 1000;
  let sec = parseInt(duration_s % 60);
  if (sec < 10) {
    return `0` + sec;
  } else return sec;
};

const ConvertMin = (miliseconds) => {
  let duration_s = miliseconds / 1000;
  let min = parseInt(duration_s / 60);

  return min;
};

export { ConvertMin, ConvertSec };
