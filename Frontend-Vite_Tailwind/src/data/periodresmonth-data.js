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

export const periodResMonthData = range(0, 12, 1);
export default periodResMonthData;
  