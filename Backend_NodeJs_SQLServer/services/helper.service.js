const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  checkKey,
  responseResult,
  convertIdTo4Code,
  convertIdTo3Code,
  covertMonthThai1,
  covertMonthThai2,
  convertYearTh,
  numberFormat,
  coventCashCollectToCashAmount,
  covertCashCollectToCashBank
};


function checkKey(apiKey) {
  if (apiKey != process.env.API_KEY) {
    return false;
  }
  return true;
}

function responseResult(status, message, size, data) {

  return {
      status,
      message,
      size,
      data
  }
}

async function convertIdTo4Code(id){
  return id.toString().length === 1
  ? "000" + id.toString()
  : id.toString().length === 2
  ? "00" + id.toString()
  : id.toString().length === 3
  ? "0" + id.toString()
  : id.toString();
}

async function convertIdTo3Code(id){
  return id.toString().length === 0
  ? "001"
  : id.toString().length === 1
  ? "00" + id.toString()
  : id.toString().length === 2
  ? "0" + id.toString()
  : id.toString();
}

function covertMonthThai1(month){
  switch (parseInt(month)) {
    case 1:
      return "มกราคม";
    case 2:
      return "กุมภาพันธ์";
    case 3:
      return "มีนาคม";
    case 4:
      return "เมษายน";
    case 5:
      return "พฤษภาคม";
    case 6:
      return "มิถุนายน";
    case 7:
      return "กรกฎาคม";
    case 8:
      return "สิงหาคม";
    case 9:
      return "กันยายน";
    case 10:
      return "ตุลาคม";
    case 11:
      return "พฤศจิกายน";
    case 12:
      return "ธันวาคม";
    default:
      return "ไม่พบข้อมูล";
  }
}

function covertMonthThai2(month){
  switch (parseInt(month)) {
    case 1:
      return "ม.ค.";
    case 2:
      return "ก.พ.";
    case 3:
      return "ม.ค.";
    case 4:
      return "เม.ย.";
    case 5:
      return "พ.ค.";
    case 6:
      return "มิ.ย.";
    case 7:
      return "ก.ค.";
    case 8:
      return "ส.ค.";
    case 9:
      return "ก.ย.";
    case 10:
      return "ต.ค.";
    case 11:
      return "พ.ย.";
    case 12:
      return "ธ.ค.";
    default:
      return "ไม่พบข้อมูล";
  }
}

function convertYearTh(year){
  return parseInt(year) + 543;
}

function numberFormat(value){
  return new Intl.NumberFormat('TH', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits:2
  }).format(value);
}

function coventCashCollectToCashAmount(collectAmt, cashAmt){
  return (1000*parseInt(collectAmt))*parseInt(cashAmt);
}

function covertCashCollectToCashBank(collectAmt){
  return(1000*parent(collectAmt));
}
