import dayjs from 'dayjs';
import 'dayjs/locale/th';
dayjs.locale('th');

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
  
const yearBoundary = 99;
const thisYear = dayjs().year();
const minYear = thisYear - 65;
const maxYear = thisYear - 20;

export const yearData = range(minYear, maxYear, 1);
export default yearData;