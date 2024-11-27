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
  
const dayAdd30 = dayjs().add(30,'day');
const thisYear = dayAdd30.get('year');
const minYear = thisYear;
var maxYear;
if(dayAdd30.get('month') +1 >= 12){
  maxYear = thisYear + 1
}else{
  maxYear = thisYear;
}

export const yearContractData = range(minYear, maxYear, 1);
export default yearContractData;