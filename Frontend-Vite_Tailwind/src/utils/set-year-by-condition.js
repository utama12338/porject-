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
  

export function calculateYearByAge(maxAge, minAge){
    const thisYear = dayjs().year();
    const minYear = thisYear - maxAge;
    const maxYear = thisYear - minAge;

    return range(minYear, maxYear, 1);
}

export default calculateYearByAge;