export const range = (startVal = 0, endVal = 0, increment = 0) => {
    let list = [];
    if (increment <= 0) {
      return list;
    }
    for (let index = startVal; index <= endVal; index = index + increment) {
      list = [...list, index];
    }
    return list;
};

export const periodResYearData = range(0, 60, 1);
export default periodResYearData;
  