import dayjs from 'dayjs';

function splitPipe(value) {
  return value.split('|');
}

function getTilteList() {
  let data = [
    {
      value: '0',
      label: 'เลือกคำนำหน้าชื่อ',
    },
    {
      value: '1',
      label: 'นาย',
    },
    {
      value: '2',
      label: 'นาง',
    },
    {
      value: '3',
      label: 'นางสาว',
    },
  ];
  return data;
}

const dayjsBuddhist = require('dayjs/plugin/buddhistEra');
dayjs.extend(dayjsBuddhist);

function toBuddhistAdapter(date){
  return dayjs(date).format('BBBB-MM-DD');
}

function fromBuddhistAdapter(buddhistDate){
  return dayjs(buddhistDate, { isBuddhist: true}).format();
}

function decimalCommaFormat(number){
  const options = { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  };

  const valueFormat = Number(number).toLocaleString('en', options);
  console.log(valueFormat);

  return valueFormat;
}

export default {
  splitPipe,
  getTilteList,
  toBuddhistAdapter,
  fromBuddhistAdapter,
  decimalCommaFormat
};
