const Excel = require("exceljs");
const fs = require("fs");
const th = require("date-fns/locale/th");
const { format, addYears } = require("date-fns");
const { downloadFile, deleteFile } = require("./file.manager.service");
const helperService = require("./helper.service");

module.exports = {
  getRptCenterCashFailedSummary,
  getRptCashDiff,
  getRptCashFake,
  getDocumentCashRequestWithdrawDeposit,
  getRptCashRequestCashCenter,
};

const fontHeader = { name: "TH SarabunPSK", size: 18, bold: true };
const fontSubHeader = { name: "TH SarabunPSK", size: 16, bold: true };
const fontTableHeader = { name: "TH SarabunPSK", size: 14, bold: true };
const fontTableDetail = { name: "TH SarabunPSK", size: 14 };
const fontTableDetailฺBold = { name: "TH SarabunPSK", size: 14, bold: true };
const alignmentCenter = {
  vertical: "middle",
  horizontal: "center",
  wrapText: true,
};
const alignmentRight = {
  vertical: "middle",
  horizontal: "right",
  wrapText: true,
};
const alignmentLeft = {
  vertical: "middle",
  horizontal: "left",
  wrapText: true,
};
const borderTable = {
  top: { style: "thin" },
  left: { style: "thin" },
  bottom: { style: "thin" },
  right: { style: "thin" },
};

async function sendWorkbook(name, workbook, response) {
  let date = format(new Date(), "ddMMyyyyhhmmss", { locale: th });

  let fileName = `${name}-${date}.xlsx`;
  let filePath = `file/${fileName}`;

  const fileStream = fs.createWriteStream(filePath);
  await workbook.xlsx.write(fileStream);

  downloadFile(response, filePath, fileName);
  deleteFile(filePath);
}
async function sendWorkbookCSV(name, workbook, response) {
  let date = format(new Date(), "ddMMyyyyhhmmss", { locale: th });

  let fileName = `${name}-${date}.csv`;
  let filePath = `file/${fileName}`;

  const fileStream = fs.createWriteStream(filePath);
  await workbook.csv.write(fileStream, {
    type: "text/csv;charset=utf-8",

    formatterOptions: {
      escape: ",",
      delimiter: ",",
      quote: false,
      writeBOM: true,
    },
  });

  downloadFile(response, filePath, fileName);
  deleteFile(filePath);
}

async function getRptCenterCashFailedSummary(
  header,
  subheader,
  filename,
  data,
  res
) {
  const workbook = new Excel.Workbook();
  workbook.creator = "MASP-CASH_SYSTEM";
  workbook.lastModifiedBy = "System";
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.calcProperties.fullCalcOnLoad = true;

  const sheet = workbook.addWorksheet(header);

  sheet.mergeCells("B2:U2");
  sheet.getCell("B2").font = fontHeader;
  sheet.getCell("B2").alignment = alignmentCenter;
  sheet.getCell("B2").value = header; // report name

  sheet.mergeCells("B3:U3");
  sheet.getCell("B3").font = fontSubHeader;
  sheet.getCell("B3").alignment = alignmentCenter;
  sheet.getCell("B3").value = subheader; // report date

  //draw table header
  sheet.mergeCells("B4:B6");
  sheet.getCell("B4").font = fontTableHeader;
  sheet.getCell("B4").alignment = alignmentCenter;
  sheet.getCell("B4").border = borderTable;
  sheet.getCell("B4").value = "วันที่";
  sheet.mergeCells("C4:C6");
  sheet.getCell("C4").font = fontTableHeader;
  sheet.getCell("C4").alignment = alignmentCenter;
  sheet.getCell("C4").border = borderTable;
  sheet.getCell("C4").value = "รหัสศูนย์ต้นทุน";
  sheet.mergeCells("D4:D6");
  sheet.getCell("D4").font = fontTableHeader;
  sheet.getCell("D4").alignment = alignmentCenter;
  sheet.getCell("D4").border = borderTable;
  sheet.getCell("D4").value = "สาขา";
  sheet.mergeCells("E4:E6");
  sheet.getCell("E4").font = fontTableHeader;
  sheet.getCell("E4").alignment = alignmentCenter;
  sheet.getCell("E4").border = borderTable;
  sheet.getCell("E4").value = "ศูนย์เงินสด";

  sheet.mergeCells("F4:M4");
  sheet.getCell("F4").font = fontTableHeader;
  sheet.getCell("F4").alignment = alignmentCenter;
  sheet.getCell("F4").border = borderTable;
  sheet.getCell("F4").value = "แลกค่าได้ทันที";
  sheet.mergeCells("N4:U4");
  sheet.getCell("N4").font = fontTableHeader;
  sheet.getCell("N4").alignment = alignmentCenter;
  sheet.getCell("N4").border = borderTable;
  sheet.getCell("N4").value = "เขียนคำร้อง";

  sheet.mergeCells("F5:F6");
  sheet.getCell("F5").font = fontTableHeader;
  sheet.getCell("F5").alignment = alignmentCenter;
  sheet.getCell("F5").border = borderTable;
  sheet.getCell("F5").value = "จำนวนราย";
  sheet.mergeCells("G5:M5");
  sheet.getCell("G5").font = fontTableHeader;
  sheet.getCell("G5").alignment = alignmentCenter;
  sheet.getCell("G5").border = borderTable;
  sheet.getCell("G5").value = "จำนวนเงิน (บาท)";

  sheet.mergeCells("N5:N6");
  sheet.getCell("N5").font = fontTableHeader;
  sheet.getCell("N5").alignment = alignmentCenter;
  sheet.getCell("N5").border = borderTable;
  sheet.getCell("N5").value = "จำนวนราย";
  sheet.mergeCells("O5:U5");
  sheet.getCell("O5").font = fontTableHeader;
  sheet.getCell("O5").alignment = alignmentCenter;
  sheet.getCell("O5").border = borderTable;
  sheet.getCell("O5").value = "จำนวนเงิน (บาท)";

  sheet.getCell("G6").font = fontTableHeader;
  sheet.getCell("G6").alignment = alignmentCenter;
  sheet.getCell("G6").border = borderTable;
  sheet.getCell("G6").value = "1,000";

  sheet.getCell("H6").font = fontTableHeader;
  sheet.getCell("H6").alignment = alignmentCenter;
  sheet.getCell("H6").border = borderTable;
  sheet.getCell("H6").value = "500";

  sheet.getCell("I6").font = fontTableHeader;
  sheet.getCell("I6").alignment = alignmentCenter;
  sheet.getCell("I6").border = borderTable;
  sheet.getCell("I6").value = "100";

  sheet.getCell("J6").font = fontTableHeader;
  sheet.getCell("J6").alignment = alignmentCenter;
  sheet.getCell("J6").border = borderTable;
  sheet.getCell("J6").value = "50";

  sheet.getCell("K6").font = fontTableHeader;
  sheet.getCell("K6").alignment = alignmentCenter;
  sheet.getCell("K6").border = borderTable;
  sheet.getCell("K6").value = "20";

  sheet.getCell("L6").font = fontTableHeader;
  sheet.getCell("L6").alignment = alignmentCenter;
  sheet.getCell("L6").border = borderTable;
  sheet.getCell("L6").value = "อื่นๆ";

  sheet.getCell("M6").font = fontTableHeader;
  sheet.getCell("M6").alignment = alignmentCenter;
  sheet.getCell("M6").border = borderTable;
  sheet.getCell("M6").value = "รวม";

  sheet.getCell("O6", "").font = fontTableHeader;
  sheet.getCell("O6").alignment = alignmentCenter;
  sheet.getCell("O6").border = borderTable;
  sheet.getCell("O6").value = "1,000";

  sheet.getCell("P6").font = fontTableHeader;
  sheet.getCell("P6").alignment = alignmentCenter;
  sheet.getCell("P6").border = borderTable;
  sheet.getCell("P6").value = "500";

  sheet.getCell("Q6").font = fontTableHeader;
  sheet.getCell("Q6").alignment = alignmentCenter;
  sheet.getCell("Q6").border = borderTable;
  sheet.getCell("Q6").value = "100";

  sheet.getCell("R6").font = fontTableHeader;
  sheet.getCell("R6").alignment = alignmentCenter;
  sheet.getCell("R6").border = borderTable;
  sheet.getCell("R6").value = "50";

  sheet.getCell("S6").font = fontTableHeader;
  sheet.getCell("S6").alignment = alignmentCenter;
  sheet.getCell("S6").border = borderTable;
  sheet.getCell("S6").value = "20";

  sheet.getCell("T6").font = fontTableHeader;
  sheet.getCell("T6").alignment = alignmentCenter;
  sheet.getCell("T6").border = borderTable;
  sheet.getCell("T6").value = "อื่นๆ";

  sheet.getCell("U6").font = fontTableHeader;
  sheet.getCell("U6").alignment = alignmentCenter;
  sheet.getCell("U6").border = borderTable;
  sheet.getCell("U6").value = "รวม";

  //draw detail table
  let checkDate = "";
  let i = 0;
  data.map((obj) => {
    let dateTh =
      obj.document_date.substring(6, 8) +
      " " +
      helperService.covertMonthThai1(
        parseInt(obj.document_date.substring(4, 6))
      ) +
      " " +
      helperService.convertYearTh(obj.document_date.substring(0, 4));

    if (checkDate !== obj.document_date) {
      i = i === 0 ? 7 : i + 1;
      if (obj.cash_type === "แลกค่าได้ทันที") {
        let sum_amount =
          (!obj.cash_amt_1000 ? 0.0 : parseFloat(obj.cash_amt_1000)) +
          (!obj.cash_amt_500 ? 0.0 : parseFloat(obj.cash_amt_500)) +
          (!obj.cash_amt_100 ? 0.0 : parseFloat(obj.cash_amt_100)) +
          (!obj.cash_amt_50 ? 0.0 : parseFloat(obj.cash_amt_50)) +
          (!obj.cash_amt_20 ? 0.0 : parseFloat(obj.cash_amt_20)) +
          (!obj.cash_amt_1000 ? 0.0 : parseFloat(obj.cash_amt_อื่นๆ));

        sheet.getCell("B" + i).font = fontTableDetail;
        sheet.getCell("B" + i).alignment = alignmentCenter;
        sheet.getCell("B" + i).border = borderTable;
        sheet.getCell("B" + i).value = dateTh;

        sheet.getCell("C" + i).font = fontTableDetail;
        sheet.getCell("C" + i).alignment = alignmentCenter;
        sheet.getCell("C" + i).border = borderTable;
        sheet.getCell("C" + i).value = obj.cost_center;

        sheet.getCell("D" + i).font = fontTableDetail;
        sheet.getCell("D" + i).alignment = alignmentCenter;
        sheet.getCell("D" + i).border = borderTable;
        sheet.getCell("D" + i).value = obj.branch_name;

        sheet.getCell("E" + i).font = fontTableDetail;
        sheet.getCell("E" + i).alignment = alignmentCenter;
        sheet.getCell("E" + i).border = borderTable;
        sheet.getCell("E" + i).value = obj.cash_center_name;

        sheet.getCell("F" + i).font = fontTableDetail;
        sheet.getCell("F" + i).alignment = alignmentCenter;
        sheet.getCell("F" + i).border = borderTable;
        sheet.getCell("F" + i).value = !obj.cash_people_amount
          ? "-"
          : obj.cash_people_amount;

        sheet.getCell("G" + i).font = fontTableDetail;
        sheet.getCell("G" + i).alignment = alignmentCenter;
        sheet.getCell("G" + i).border = borderTable;
        sheet.getCell("G" + i).value = !obj.cash_amt_1000
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_1000));

        sheet.getCell("H" + i).font = fontTableDetail;
        sheet.getCell("H" + i).alignment = alignmentCenter;
        sheet.getCell("H" + i).border = borderTable;
        sheet.getCell("H" + i).value = !obj.cash_amt_500
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_500));

        sheet.getCell("I" + i).font = fontTableDetail;
        sheet.getCell("I" + i).alignment = alignmentCenter;
        sheet.getCell("I" + i).border = borderTable;
        sheet.getCell("I" + i).value = !obj.cash_amt_100
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_100));

        sheet.getCell("J" + i).font = fontTableDetail;
        sheet.getCell("J" + i).alignment = alignmentCenter;
        sheet.getCell("J" + i).border = borderTable;
        sheet.getCell("J" + i).value = !obj.cash_amt_50
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_50));

        sheet.getCell("K" + i).font = fontTableDetail;
        sheet.getCell("K" + i).alignment = alignmentCenter;
        sheet.getCell("K" + i).border = borderTable;
        sheet.getCell("K" + i).value = !obj.cash_amt_20
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_20));

        sheet.getCell("L" + i).font = fontTableDetail;
        sheet.getCell("L" + i).alignment = alignmentCenter;
        sheet.getCell("L" + i).border = borderTable;
        sheet.getCell("L" + i).value = !obj.cash_amt_อื่นๆ
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_อื่นๆ));

        sheet.getCell("M" + i).font = fontTableDetail;
        sheet.getCell("M" + i).alignment = alignmentCenter;
        sheet.getCell("M" + i).border = borderTable;
        sheet.getCell("M" + i).value = !sum_amount
          ? "-"
          : helperService.numberFormat(sum_amount);

        sheet.getCell("N" + i).font = fontTableDetail;
        sheet.getCell("N" + i).alignment = alignmentCenter;
        sheet.getCell("N" + i).border = borderTable;
        sheet.getCell("N" + i).value = "-";

        sheet.getCell("O" + i).font = fontTableDetail;
        sheet.getCell("O" + i).alignment = alignmentCenter;
        sheet.getCell("O" + i).border = borderTable;
        sheet.getCell("O" + i).value = "-";

        sheet.getCell("P" + i).font = fontTableDetail;
        sheet.getCell("P" + i).alignment = alignmentCenter;
        sheet.getCell("P" + i).border = borderTable;
        sheet.getCell("P" + i).value = "-";

        sheet.getCell("Q" + i).font = fontTableDetail;
        sheet.getCell("Q" + i).alignment = alignmentCenter;
        sheet.getCell("Q" + i).border = borderTable;
        sheet.getCell("Q" + i).value = "-";

        sheet.getCell("R" + i).font = fontTableDetail;
        sheet.getCell("R" + i).alignment = alignmentCenter;
        sheet.getCell("R" + i).border = borderTable;
        sheet.getCell("R" + i).value = "-";

        sheet.getCell("S" + i).font = fontTableDetail;
        sheet.getCell("S" + i).alignment = alignmentCenter;
        sheet.getCell("S" + i).border = borderTable;
        sheet.getCell("S" + i).value = "-";

        sheet.getCell("T" + i).font = fontTableDetail;
        sheet.getCell("T" + i).alignment = alignmentCenter;
        sheet.getCell("T" + i).border = borderTable;
        sheet.getCell("T" + i).value = "-";

        sheet.getCell("U" + i).font = fontTableDetail;
        sheet.getCell("U" + i).alignment = alignmentCenter;
        sheet.getCell("U" + i).border = borderTable;
        sheet.getCell("U" + i).value = "-";
      } else if (obj.cash_type === "เขียนคำร้อง") {
        let sum_amount =
          (!obj.cash_amt_1000 ? 0.0 : parseFloat(obj.cash_amt_1000)) +
          (!obj.cash_amt_500 ? 0.0 : parseFloat(obj.cash_amt_500)) +
          (!obj.cash_amt_100 ? 0.0 : parseFloat(obj.cash_amt_100)) +
          (!obj.cash_amt_50 ? 0.0 : parseFloat(obj.cash_amt_50)) +
          (!obj.cash_amt_20 ? 0.0 : parseFloat(obj.cash_amt_20)) +
          (!obj.cash_amt_1000 ? 0.0 : parseFloat(obj.cash_amt_อื่นๆ));

        sheet.getCell("B" + i).font = fontTableDetail;
        sheet.getCell("B" + i).alignment = alignmentCenter;
        sheet.getCell("B" + i).border = borderTable;
        sheet.getCell("B" + i).value = dateTh;

        sheet.getCell("C" + i).font = fontTableDetail;
        sheet.getCell("C" + i).alignment = alignmentCenter;
        sheet.getCell("C" + i).border = borderTable;
        sheet.getCell("C" + i).value = obj.cost_center;

        sheet.getCell("D" + i).font = fontTableDetail;
        sheet.getCell("D" + i).alignment = alignmentCenter;
        sheet.getCell("D" + i).border = borderTable;
        sheet.getCell("D" + i).value = obj.branch_name;

        sheet.getCell("E" + i).font = fontTableDetail;
        sheet.getCell("E" + i).alignment = alignmentCenter;
        sheet.getCell("E" + i).border = borderTable;
        sheet.getCell("E" + i).value = obj.cash_center_name;

        sheet.getCell("F" + i).font = fontTableDetail;
        sheet.getCell("F" + i).alignment = alignmentCenter;
        sheet.getCell("F" + i).border = borderTable;
        sheet.getCell("F" + i).value = "-";

        sheet.getCell("G" + i).font = fontTableDetail;
        sheet.getCell("G" + i).alignment = alignmentCenter;
        sheet.getCell("G" + i).border = borderTable;
        sheet.getCell("G" + i).value = "-";

        sheet.getCell("H" + i).font = fontTableDetail;
        sheet.getCell("H" + i).alignment = alignmentCenter;
        sheet.getCell("H" + i).border = borderTable;
        sheet.getCell("H" + i).value = "-";

        sheet.getCell("I" + i).font = fontTableDetail;
        sheet.getCell("I" + i).alignment = alignmentCenter;
        sheet.getCell("I" + i).border = borderTable;
        sheet.getCell("I" + i).value = "-";

        sheet.getCell("J" + i).font = fontTableDetail;
        sheet.getCell("J" + i).alignment = alignmentCenter;
        sheet.getCell("J" + i).border = borderTable;
        sheet.getCell("J" + i).value = "-";

        sheet.getCell("K" + i).font = fontTableDetail;
        sheet.getCell("K" + i).alignment = alignmentCenter;
        sheet.getCell("K" + i).border = borderTable;
        sheet.getCell("K" + i).value = "-";

        sheet.getCell("L" + i).font = fontTableDetail;
        sheet.getCell("L" + i).alignment = alignmentCenter;
        sheet.getCell("L" + i).border = borderTable;
        sheet.getCell("L" + i).value = "-";

        sheet.getCell("M" + i).font = fontTableDetail;
        sheet.getCell("M" + i).alignment = alignmentCenter;
        sheet.getCell("M" + i).border = borderTable;
        sheet.getCell("M" + i).value = "-";

        sheet.getCell("N" + i).font = fontTableDetail;
        sheet.getCell("N" + i).alignment = alignmentCenter;
        sheet.getCell("N" + i).border = borderTable;
        sheet.getCell("N" + i).value = !obj.cash_people_amount
          ? "-"
          : obj.cash_people_amount;

        sheet.getCell("O" + i).font = fontTableDetail;
        sheet.getCell("O" + i).alignment = alignmentCenter;
        sheet.getCell("O" + i).border = borderTable;
        sheet.getCell("O" + i).value = !obj.cash_amt_1000
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_1000));

        sheet.getCell("P" + i).font = fontTableDetail;
        sheet.getCell("P" + i).alignment = alignmentCenter;
        sheet.getCell("P" + i).border = borderTable;
        sheet.getCell("P" + i).value = !obj.cash_amt_500
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_500));

        sheet.getCell("Q" + i).font = fontTableDetail;
        sheet.getCell("Q" + i).alignment = alignmentCenter;
        sheet.getCell("Q" + i).border = borderTable;
        sheet.getCell("Q" + i).value = !obj.cash_amt_100
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_100));

        sheet.getCell("R" + i).font = fontTableDetail;
        sheet.getCell("R" + i).alignment = alignmentCenter;
        sheet.getCell("R" + i).border = borderTable;
        sheet.getCell("R" + i).value = !obj.cash_amt_50
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_50));

        sheet.getCell("S" + i).font = fontTableDetail;
        sheet.getCell("S" + i).alignment = alignmentCenter;
        sheet.getCell("S" + i).border = borderTable;
        sheet.getCell("S" + i).value = !obj.cash_amt_20
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_20));

        sheet.getCell("T" + i).font = fontTableDetail;
        sheet.getCell("T" + i).alignment = alignmentCenter;
        sheet.getCell("T" + i).border = borderTable;
        sheet.getCell("T" + i).value = !obj.cash_amt_อื่นๆ
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_อื่นๆ));

        sheet.getCell("U" + i).font = fontTableDetail;
        sheet.getCell("U" + i).alignment = alignmentCenter;
        sheet.getCell("U" + i).border = borderTable;
        sheet.getCell("U" + i).value = !sum_amount
          ? "-"
          : helperService.numberFormat(sum_amount);
      }

      checkDate = obj.document_date;
    } else {
      if (obj.cash_type === "แลกค่าได้ทันที") {
        let sum_amount =
          (!obj.cash_amt_1000 ? 0.0 : parseFloat(obj.cash_amt_1000)) +
          (!obj.cash_amt_500 ? 0.0 : parseFloat(obj.cash_amt_500)) +
          (!obj.cash_amt_100 ? 0.0 : parseFloat(obj.cash_amt_100)) +
          (!obj.cash_amt_50 ? 0.0 : parseFloat(obj.cash_amt_50)) +
          (!obj.cash_amt_20 ? 0.0 : parseFloat(obj.cash_amt_20)) +
          (!obj.cash_amt_1000 ? 0.0 : parseFloat(obj.cash_amt_อื่นๆ));

        sheet.getCell("F" + i).font = fontTableDetail;
        sheet.getCell("F" + i).alignment = alignmentCenter;
        sheet.getCell("F" + i).border = borderTable;
        sheet.getCell("F" + i).value = !obj.cash_people_amount
          ? "-"
          : obj.cash_people_amount;

        sheet.getCell("G" + i).font = fontTableDetail;
        sheet.getCell("G" + i).alignment = alignmentCenter;
        sheet.getCell("G" + i).border = borderTable;
        sheet.getCell("G" + i).value = !obj.cash_amt_1000
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_1000));

        sheet.getCell("H" + i).font = fontTableDetail;
        sheet.getCell("H" + i).alignment = alignmentCenter;
        sheet.getCell("H" + i).border = borderTable;
        sheet.getCell("H" + i).value = !obj.cash_amt_500
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_500));

        sheet.getCell("I" + i).font = fontTableDetail;
        sheet.getCell("I" + i).alignment = alignmentCenter;
        sheet.getCell("I" + i).border = borderTable;
        sheet.getCell("I" + i).value = !obj.cash_amt_100
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_100));

        sheet.getCell("J" + i).font = fontTableDetail;
        sheet.getCell("J" + i).alignment = alignmentCenter;
        sheet.getCell("J" + i).border = borderTable;
        sheet.getCell("J" + i).value = !obj.cash_amt_50
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_50));

        sheet.getCell("K" + i).font = fontTableDetail;
        sheet.getCell("K" + i).alignment = alignmentCenter;
        sheet.getCell("K" + i).border = borderTable;
        sheet.getCell("K" + i).value = !obj.cash_amt_20
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_20));

        sheet.getCell("L" + i).font = fontTableDetail;
        sheet.getCell("L" + i).alignment = alignmentCenter;
        sheet.getCell("L" + i).border = borderTable;
        sheet.getCell("L" + i).value = !obj.cash_amt_อื่นๆ
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_อื่นๆ));

        sheet.getCell("M" + i).font = fontTableDetail;
        sheet.getCell("M" + i).alignment = alignmentCenter;
        sheet.getCell("M" + i).border = borderTable;
        sheet.getCell("M" + i).value = !sum_amount
          ? "-"
          : helperService.numberFormat(sum_amount);
      } else if (obj.cash_type === "เขียนคำร้อง") {
        let sum_amount =
          (!obj.cash_amt_1000 ? 0.0 : parseFloat(obj.cash_amt_1000)) +
          (!obj.cash_amt_500 ? 0.0 : parseFloat(obj.cash_amt_500)) +
          (!obj.cash_amt_100 ? 0.0 : parseFloat(obj.cash_amt_100)) +
          (!obj.cash_amt_50 ? 0.0 : parseFloat(obj.cash_amt_50)) +
          (!obj.cash_amt_20 ? 0.0 : parseFloat(obj.cash_amt_20)) +
          (!obj.cash_amt_1000 ? 0.0 : parseFloat(obj.cash_amt_อื่นๆ));

        sheet.getCell("N" + i).font = fontTableDetail;
        sheet.getCell("N" + i).alignment = alignmentCenter;
        sheet.getCell("N" + i).border = borderTable;
        sheet.getCell("N" + i).value = !obj.cash_people_amount
          ? "-"
          : obj.cash_people_amount;

        sheet.getCell("O" + i).font = fontTableDetail;
        sheet.getCell("O" + i).alignment = alignmentCenter;
        sheet.getCell("O" + i).border = borderTable;
        sheet.getCell("O" + i).value = !obj.cash_amt_1000
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_1000));

        sheet.getCell("P" + i).font = fontTableDetail;
        sheet.getCell("P" + i).alignment = alignmentCenter;
        sheet.getCell("P" + i).border = borderTable;
        sheet.getCell("P" + i).value = !obj.cash_amt_500
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_500));

        sheet.getCell("Q" + i).font = fontTableDetail;
        sheet.getCell("Q" + i).alignment = alignmentCenter;
        sheet.getCell("Q" + i).border = borderTable;
        sheet.getCell("Q" + i).value = !obj.cash_amt_100
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_100));

        sheet.getCell("R" + i).font = fontTableDetail;
        sheet.getCell("R" + i).alignment = alignmentCenter;
        sheet.getCell("R" + i).border = borderTable;
        sheet.getCell("R" + i).value = !obj.cash_amt_50
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_50));

        sheet.getCell("S" + i).font = fontTableDetail;
        sheet.getCell("S" + i).alignment = alignmentCenter;
        sheet.getCell("S" + i).border = borderTable;
        sheet.getCell("S" + i).value = !obj.cash_amt_20
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_20));

        sheet.getCell("T" + i).font = fontTableDetail;
        sheet.getCell("T" + i).alignment = alignmentCenter;
        sheet.getCell("T" + i).border = borderTable;
        sheet.getCell("T" + i).value = !obj.cash_amt_อื่นๆ
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_อื่นๆ));

        sheet.getCell("U" + i).font = fontTableDetail;
        sheet.getCell("U" + i).alignment = alignmentCenter;
        sheet.getCell("U" + i).border = borderTable;
        sheet.getCell("U" + i).value = !sum_amount
          ? "-"
          : helperService.numberFormat(sum_amount);
      }

      checkDate = obj.document_date;
    }
  });

  sendWorkbook(`${filename}`, workbook, res);
}

async function getRptCashDiff(header, subheader, filename, data, res) {
  const workbook = new Excel.Workbook();
  workbook.creator = "MASP-CASH_SYSTEM";
  workbook.lastModifiedBy = "System";
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.calcProperties.fullCalcOnLoad = true;

  const sheet = workbook.addWorksheet(filename);

  sheet.mergeCells("B2:I2");
  sheet.getCell("B2").font = fontHeader;
  sheet.getCell("B2").alignment = alignmentCenter;
  sheet.getCell("B2").value = header; // report name

  sheet.mergeCells("B3:I3");
  sheet.getCell("B3").font = fontSubHeader;
  sheet.getCell("B3").alignment = alignmentCenter;
  sheet.getCell("B3").value = subheader; // report date

  //draw table header
  sheet.mergeCells("B4:B5");
  sheet.getCell("B4").font = fontTableHeader;
  sheet.getCell("B4").alignment = alignmentCenter;
  sheet.getCell("B4").border = borderTable;
  sheet.getCell("B4").value = "วันที่";

  sheet.mergeCells("C4:C5");
  sheet.getCell("C4").font = fontTableHeader;
  sheet.getCell("C4").alignment = alignmentCenter;
  sheet.getCell("C4").border = borderTable;
  sheet.getCell("C4").value = "ชนิดราคา";

  sheet.mergeCells("D4:G4");
  sheet.getCell("D4").font = fontTableHeader;
  sheet.getCell("D4").alignment = alignmentCenter;
  sheet.getCell("D4").border = borderTable;
  sheet.getCell("D4").value = "ขาดเกิน";

  sheet.mergeCells("H4:I4");
  sheet.getCell("H4").font = fontTableHeader;
  sheet.getCell("H4").alignment = alignmentCenter;
  sheet.getCell("H4").border = borderTable;
  sheet.getCell("H4").value = "ชดใช้";

  sheet.getCell("D5").font = fontTableHeader;
  sheet.getCell("D5").alignment = alignmentCenter;
  sheet.getCell("D5").border = borderTable;
  sheet.getCell("D5").value = "ขาด";

  sheet.getCell("E5").font = fontTableHeader;
  sheet.getCell("E5").alignment = alignmentCenter;
  sheet.getCell("E5").border = borderTable;
  sheet.getCell("E5").value = "ปลอม";

  sheet.getCell("F5").font = fontTableHeader;
  sheet.getCell("F5").alignment = alignmentCenter;
  sheet.getCell("F5").border = borderTable;
  sheet.getCell("F5").value = "ชำรุด";

  sheet.mergeCells("G5");
  sheet.getCell("G5").font = fontTableHeader;
  sheet.getCell("G5").alignment = alignmentCenter;
  sheet.getCell("G5").border = borderTable;
  sheet.getCell("G5").value = "เกิน";

  sheet.mergeCells("H5");
  sheet.getCell("H5").font = fontTableHeader;
  sheet.getCell("H5").alignment = alignmentCenter;
  sheet.getCell("H5").border = borderTable;
  sheet.getCell("H5").value = "สาขาชดใช้";

  sheet.mergeCells("I5");
  sheet.getCell("I5").font = fontTableHeader;
  sheet.getCell("I5").alignment = alignmentCenter;
  sheet.getCell("I5").border = borderTable;
  sheet.getCell("I5").value = "ศูนย์ส่งคืน";

  let checkDate = "";
  let row = 0;
  let merge = 5;

  data.map((obj) => {
    if (checkDate != obj.document_date) {
      row = row === 0 ? 6 : row + 6;

      let dateTh =
        obj.document_date.substring(6, 8) +
        " " +
        helperService.covertMonthThai1(
          parseInt(obj.document_date.substring(4, 6))
        ) +
        " " +
        helperService.convertYearTh(obj.document_date.substring(0, 4));

      sheet.mergeCells("B" + row + ":B" + (row + merge));
      sheet.getCell("B" + row).font = fontTableDetail;
      sheet.getCell("B" + row).alignment = alignmentCenter;
      sheet.getCell("B" + row).border = borderTable;
      sheet.getCell("B" + row).value = dateTh;

      sheet.getCell("C" + row).font = fontTableDetail;
      sheet.getCell("C" + row).alignment = alignmentCenter;
      sheet.getCell("C" + row).border = borderTable;
      sheet.getCell("C" + row).value = "1,000";

      sheet.getCell("C" + (row + 1)).font = fontTableDetail;
      sheet.getCell("C" + (row + 1)).alignment = alignmentCenter;
      sheet.getCell("C" + (row + 1)).border = borderTable;
      sheet.getCell("C" + (row + 1)).value = "500";

      sheet.mergeCells("C" + (row + 2));
      sheet.getCell("C" + (row + 2)).font = fontTableDetail;
      sheet.getCell("C" + (row + 2)).alignment = alignmentCenter;
      sheet.getCell("C" + (row + 2)).border = borderTable;
      sheet.getCell("C" + (row + 2)).value = "100";

      sheet.mergeCells("C" + (row + 3));
      sheet.getCell("C" + (row + 3)).font = fontTableDetail;
      sheet.getCell("C" + (row + 3)).alignment = alignmentCenter;
      sheet.getCell("C" + (row + 3)).border = borderTable;
      sheet.getCell("C" + (row + 3)).value = "50";

      sheet.mergeCells("C" + (row + 4));
      sheet.getCell("C" + (row + 4)).font = fontTableDetail;
      sheet.getCell("C" + (row + 4)).alignment = alignmentCenter;
      sheet.getCell("C" + (row + 4)).border = borderTable;
      sheet.getCell("C" + (row + 4)).value = "20";

      sheet.mergeCells("C" + (row + 5));
      sheet.getCell("C" + (row + 5)).font = fontTableDetailฺBold;
      sheet.getCell("C" + (row + 5)).alignment = alignmentCenter;
      sheet.getCell("C" + (row + 5)).border = borderTable;
      sheet.getCell("C" + (row + 5)).value = "รวม";

      var sum_cash_type_ขาด = 0;
      sheet.getCell("D" + row).font = fontTableDetail;
      sheet.getCell("D" + row).alignment = alignmentCenter;
      sheet.getCell("D" + row).border = borderTable;
      sheet.getCell("D" + row).value =
        obj.cash_price === "1000" && obj.cash_type_ขาด
          ? helperService.numberFormat(parseFloat(obj.cash_type_ขาด))
          : "-";
      sum_cash_type_ขาด +=
        obj.cash_price === "1000" && obj.cash_type_ขาด
          ? helperService.numberFormat(parseFloat(obj.cash_type_ขาด))
          : 0.0;
      sheet.getCell("D" + (row + 1)).font = fontTableDetail;
      sheet.getCell("D" + (row + 1)).alignment = alignmentCenter;
      sheet.getCell("D" + (row + 1)).border = borderTable;
      sheet.getCell("D" + (row + 1)).value =
        obj.cash_price === "500" && obj.cash_type_ขาด
          ? helperService.numberFormat(parseFloat(obj.cash_type_ขาด))
          : "-";
      sum_cash_type_ขาด +=
        obj.cash_price === "500" && obj.cash_type_ขาด
          ? helperService.numberFormat(parseFloat(obj.cash_type_ขาด))
          : 0.0;
      sheet.getCell("D" + (row + 2)).font = fontTableDetail;
      sheet.getCell("D" + (row + 2)).alignment = alignmentCenter;
      sheet.getCell("D" + (row + 2)).border = borderTable;
      sheet.getCell("D" + (row + 2)).value =
        obj.cash_price === "100" && obj.cash_type_ขาด
          ? helperService.numberFormat(parseFloat(obj.cash_type_ขาด))
          : "-";
      sum_cash_type_ขาด +=
        obj.cash_price === "100" && obj.cash_type_ขาด
          ? helperService.numberFormat(parseFloat(obj.cash_type_ขาด))
          : 0.0;
      sheet.getCell("D" + (row + 3)).font = fontTableDetail;
      sheet.getCell("D" + (row + 3)).alignment = alignmentCenter;
      sheet.getCell("D" + (row + 3)).border = borderTable;
      sheet.getCell("D" + (row + 3)).value =
        obj.cash_price === "50" && obj.cash_type_ขาด
          ? helperService.numberFormat(parseFloat(obj.cash_type_ขาด))
          : "-";
      sum_cash_type_ขาด +=
        obj.cash_price === "50" && obj.cash_type_ขาด
          ? helperService.numberFormat(parseFloat(obj.cash_type_ขาด))
          : 0.0;
      sheet.getCell("D" + (row + 4)).font = fontTableDetail;
      sheet.getCell("D" + (row + 4)).alignment = alignmentCenter;
      sheet.getCell("D" + (row + 4)).border = borderTable;
      sheet.getCell("D" + (row + 4)).value =
        obj.cash_price === "20" && obj.cash_type_ขาด
          ? helperService.numberFormat(parseFloat(obj.cash_type_ขาด))
          : "-";
      sum_cash_type_ขาด +=
        obj.cash_price === "20" && obj.cash_type_ขาด
          ? helperService.numberFormat(parseFloat(obj.cash_type_ขาด))
          : 0.0;
      sheet.getCell("D" + (row + 5)).font = fontTableDetailฺBold;
      sheet.getCell("D" + (row + 5)).alignment = alignmentCenter;
      sheet.getCell("D" + (row + 5)).border = borderTable;
      sheet.getCell("D" + (row + 5)).value =
        helperService.numberFormat(sum_cash_type_ขาด);

      var sum_cash_type_ปลอม = 0;
      sheet.getCell("E" + row).font = fontTableDetail;
      sheet.getCell("E" + row).alignment = alignmentCenter;
      sheet.getCell("E" + row).border = borderTable;
      sheet.getCell("E" + row).value =
        obj.cash_price === "1000" && obj.cash_type_ปลอม
          ? helperService.numberFormat(parseFloat(obj.cash_type_ปลอม))
          : "-";
      sum_cash_type_ปลอม +=
        obj.cash_price === "1000" && obj.cash_type_ปลอม
          ? helperService.numberFormat(parseFloat(obj.cash_type_ปลอม))
          : 0.0;
      sheet.getCell("E" + (row + 1)).font = fontTableDetail;
      sheet.getCell("E" + (row + 1)).alignment = alignmentCenter;
      sheet.getCell("E" + (row + 1)).border = borderTable;
      sheet.getCell("E" + (row + 1)).value =
        obj.cash_price === "500" && obj.cash_type_ปลอม
          ? helperService.numberFormat(parseFloat(obj.cash_type_ปลอม))
          : "-";
      sum_cash_type_ปลอม +=
        obj.cash_price === "500" && obj.cash_type_ปลอม
          ? helperService.numberFormat(parseFloat(obj.cash_type_ปลอม))
          : 0.0;
      sheet.getCell("E" + (row + 2)).font = fontTableDetail;
      sheet.getCell("E" + (row + 2)).alignment = alignmentCenter;
      sheet.getCell("E" + (row + 2)).border = borderTable;
      sheet.getCell("E" + (row + 2)).value =
        obj.cash_price === "100" && obj.cash_type_ปลอม
          ? helperService.numberFormat(parseFloat(obj.cash_type_ปลอม))
          : "-";
      sum_cash_type_ปลอม +=
        obj.cash_price === "100" && obj.cash_type_ปลอม
          ? helperService.numberFormat(parseFloat(obj.cash_type_ปลอม))
          : 0.0;
      sheet.getCell("E" + (row + 3)).font = fontTableDetail;
      sheet.getCell("E" + (row + 3)).alignment = alignmentCenter;
      sheet.getCell("E" + (row + 3)).border = borderTable;
      sheet.getCell("E" + (row + 3)).value =
        obj.cash_price === "50" && obj.cash_type_ปลอม
          ? helperService.numberFormat(parseFloat(obj.cash_type_ปลอม))
          : "-";
      sum_cash_type_ปลอม +=
        obj.cash_price === "50" && obj.cash_type_ปลอม
          ? helperService.numberFormat(parseFloat(obj.cash_type_ปลอม))
          : 0.0;
      sheet.getCell("E" + (row + 4)).font = fontTableDetail;
      sheet.getCell("E" + (row + 4)).alignment = alignmentCenter;
      sheet.getCell("E" + (row + 4)).border = borderTable;
      sheet.getCell("E" + (row + 4)).value =
        obj.cash_price === "20" && obj.cash_type_ปลอม
          ? helperService.numberFormat(parseFloat(obj.cash_type_ปลอม))
          : "-";
      sum_cash_type_ปลอม +=
        obj.cash_price === "20" && obj.cash_type_ปลอม
          ? helperService.numberFormat(parseFloat(obj.cash_type_ปลอม))
          : 0.0;
      sheet.getCell("E" + (row + 5)).font = fontTableDetailฺBold;
      sheet.getCell("E" + (row + 5)).alignment = alignmentCenter;
      sheet.getCell("E" + (row + 5)).border = borderTable;
      sheet.getCell("E" + (row + 5)).value =
        helperService.numberFormat(sum_cash_type_ปลอม);

      var sum_cash_type_ชำรุด = 0;
      sheet.getCell("F" + row).font = fontTableDetail;
      sheet.getCell("F" + row).alignment = alignmentCenter;
      sheet.getCell("F" + row).border = borderTable;
      sheet.getCell("F" + row).value =
        obj.cash_price === "1000" && obj.cash_type_ชำรุด
          ? helperService.numberFormat(parseFloat(obj.cash_type_ชำรุด))
          : "-";
      sum_cash_type_ชำรุด +=
        obj.cash_price === "1000" && obj.cash_type_ชำรุด
          ? helperService.numberFormat(parseFloat(obj.cash_type_ชำรุด))
          : 0.0;
      sheet.getCell("F" + (row + 1)).font = fontTableDetail;
      sheet.getCell("F" + (row + 1)).alignment = alignmentCenter;
      sheet.getCell("F" + (row + 1)).border = borderTable;
      sheet.getCell("F" + (row + 1)).value =
        obj.cash_price === "500" && obj.cash_type_ชำรุด
          ? helperService.numberFormat(parseFloat(obj.cash_type_ชำรุด))
          : "-";
      sum_cash_type_ชำรุด +=
        obj.cash_price === "500" && obj.cash_type_ชำรุด
          ? helperService.numberFormat(parseFloat(obj.cash_type_ชำรุด))
          : 0.0;
      sheet.getCell("F" + (row + 2)).font = fontTableDetail;
      sheet.getCell("F" + (row + 2)).alignment = alignmentCenter;
      sheet.getCell("F" + (row + 2)).border = borderTable;
      sheet.getCell("F" + (row + 2)).value =
        obj.cash_price === "100" && obj.cash_type_ชำรุด
          ? helperService.numberFormat(parseFloat(obj.cash_type_ชำรุด))
          : "-";
      sum_cash_type_ชำรุด +=
        obj.cash_price === "100" && obj.cash_type_ชำรุด
          ? helperService.numberFormat(parseFloat(obj.cash_type_ชำรุด))
          : 0.0;
      sheet.getCell("F" + (row + 3)).font = fontTableDetail;
      sheet.getCell("F" + (row + 3)).alignment = alignmentCenter;
      sheet.getCell("F" + (row + 3)).border = borderTable;
      sheet.getCell("F" + (row + 3)).value =
        obj.cash_price === "50" && obj.cash_type_ชำรุด
          ? helperService.numberFormat(parseFloat(obj.cash_type_ชำรุด))
          : "-";
      sum_cash_type_ชำรุด +=
        obj.cash_price === "50" && obj.cash_type_ชำรุด
          ? helperService.numberFormat(parseFloat(obj.cash_type_ชำรุด))
          : 0.0;
      sheet.getCell("F" + (row + 4)).font = fontTableDetail;
      sheet.getCell("F" + (row + 4)).alignment = alignmentCenter;
      sheet.getCell("F" + (row + 4)).border = borderTable;
      sheet.getCell("F" + (row + 4)).value =
        obj.cash_price === "20" && obj.cash_type_ชำรุด
          ? helperService.numberFormat(parseFloat(obj.cash_type_ชำรุด))
          : "-";
      sum_cash_type_ชำรุด +=
        obj.cash_price === "20" && obj.cash_type_ชำรุด
          ? helperService.numberFormat(parseFloat(obj.cash_type_ชำรุด))
          : 0.0;
      sheet.getCell("F" + (row + 5)).font = fontTableDetailฺBold;
      sheet.getCell("F" + (row + 5)).alignment = alignmentCenter;
      sheet.getCell("F" + (row + 5)).border = borderTable;
      sheet.getCell("F" + (row + 5)).value =
        helperService.numberFormat(sum_cash_type_ชำรุด);

      var sum_cash_type_เกิน = 0;
      sheet.getCell("G" + row).font = fontTableDetail;
      sheet.getCell("G" + row).alignment = alignmentCenter;
      sheet.getCell("G" + row).border = borderTable;
      sheet.getCell("G" + row).value =
        obj.cash_price === "1000" && obj.cash_type_เกิน
          ? helperService.numberFormat(parseFloat(obj.cash_type_เกิน))
          : "-";
      sum_cash_type_เกิน +=
        obj.cash_price === "1000" && obj.cash_type_เกิน
          ? helperService.numberFormat(parseFloat(obj.cash_type_เกิน))
          : 0.0;
      sheet.getCell("G" + (row + 1)).font = fontTableDetail;
      sheet.getCell("G" + (row + 1)).alignment = alignmentCenter;
      sheet.getCell("G" + (row + 1)).border = borderTable;
      sheet.getCell("G" + (row + 1)).value =
        obj.cash_price === "500" && obj.cash_type_เกิน
          ? helperService.numberFormat(parseFloat(obj.cash_type_เกิน))
          : "-";
      sum_cash_type_เกิน +=
        obj.cash_price === "=500" && obj.cash_type_เกิน
          ? helperService.numberFormat(parseFloat(obj.cash_type_เกิน))
          : 0.0;
      sheet.getCell("G" + (row + 2)).font = fontTableDetail;
      sheet.getCell("G" + (row + 2)).alignment = alignmentCenter;
      sheet.getCell("G" + (row + 2)).border = borderTable;
      sheet.getCell("G" + (row + 2)).value =
        obj.cash_price === "100" && obj.cash_type_เกิน
          ? helperService.numberFormat(parseFloat(obj.cash_type_เกิน))
          : "-";
      sum_cash_type_เกิน +=
        obj.cash_price === "100" && obj.cash_type_เกิน
          ? helperService.numberFormat(parseFloat(obj.cash_type_เกิน))
          : 0.0;
      sheet.getCell("G" + (row + 3)).font = fontTableDetail;
      sheet.getCell("G" + (row + 3)).alignment = alignmentCenter;
      sheet.getCell("G" + (row + 3)).border = borderTable;
      sheet.getCell("G" + (row + 3)).value =
        obj.cash_price === "50" && obj.cash_type_เกิน
          ? helperService.numberFormat(parseFloat(obj.cash_type_เกิน))
          : "-";
      sum_cash_type_เกิน +=
        obj.cash_price === "50" && obj.cash_type_เกิน
          ? helperService.numberFormat(parseFloat(obj.cash_type_เกิน))
          : 0.0;
      sheet.getCell("G" + (row + 4)).font = fontTableDetail;
      sheet.getCell("G" + (row + 4)).alignment = alignmentCenter;
      sheet.getCell("G" + (row + 4)).border = borderTable;
      sheet.getCell("G" + (row + 4)).value =
        obj.cash_price === "20" && obj.cash_type_เกิน
          ? helperService.numberFormat(parseFloat(obj.cash_type_เกิน))
          : "-";
      sum_cash_type_เกิน +=
        obj.cash_price === "20" && obj.cash_type_เกิน
          ? helperService.numberFormat(parseFloat(obj.cash_type_เกิน))
          : 0.0;
      sheet.getCell("G" + (row + 5)).font = fontTableDetailฺBold;
      sheet.getCell("G" + (row + 5)).alignment = alignmentCenter;
      sheet.getCell("G" + (row + 5)).border = borderTable;
      sheet.getCell("G" + (row + 5)).value =
        helperService.numberFormat(sum_cash_type_เกิน);

      var sum_cash_type_สาขาชดใช้ = 0;
      sheet.getCell("H" + row).font = fontTableDetail;
      sheet.getCell("H" + row).alignment = alignmentCenter;
      sheet.getCell("H" + row).border = borderTable;
      sheet.getCell("H" + row).value =
        obj.cash_price === "1000" && obj.cash_type_สาขาชดใช้
          ? helperService.numberFormat(parseFloat(obj.cash_type_สาขาชดใช้))
          : "-";
      sum_cash_type_สาขาชดใช้ +=
        obj.cash_price === "1000" && obj.cash_type_สาขาชดใช้
          ? parseFloat(obj.cash_type_สาขาชดใช้)
          : 0.0;
      sheet.getCell("H" + (row + 1)).font = fontTableDetail;
      sheet.getCell("H" + (row + 1)).alignment = alignmentCenter;
      sheet.getCell("H" + (row + 1)).border = borderTable;
      sheet.getCell("H" + (row + 1)).value =
        obj.cash_price === "500" && obj.cash_type_สาขาชดใช้
          ? helperService.numberFormat(parseFloat(obj.cash_type_สาขาชดใช้))
          : "-";
      sum_cash_type_สาขาชดใช้ +=
        obj.cash_price === "500" && obj.cash_type_สาขาชดใช้
          ? parseFloat(obj.cash_type_สาขาชดใช้)
          : 0.0;
      sheet.getCell("H" + (row + 2)).font = fontTableDetail;
      sheet.getCell("H" + (row + 2)).alignment = alignmentCenter;
      sheet.getCell("H" + (row + 2)).border = borderTable;
      sheet.getCell("H" + (row + 2)).value =
        obj.cash_price === "100" && obj.cash_type_สาขาชดใช้
          ? helperService.numberFormat(parseFloat(obj.cash_type_สาขาชดใช้))
          : "-";
      sum_cash_type_สาขาชดใช้ +=
        obj.cash_price === "100" && obj.cash_type_สาขาชดใช้
          ? parseFloat(obj.cash_type_สาขาชดใช้)
          : 0.0;
      sheet.getCell("H" + (row + 3)).font = fontTableDetail;
      sheet.getCell("H" + (row + 3)).alignment = alignmentCenter;
      sheet.getCell("H" + (row + 3)).border = borderTable;
      sheet.getCell("H" + (row + 3)).value =
        obj.cash_price === "50" && obj.cash_type_สาขาชดใช้
          ? helperService.numberFormat(parseFloat(obj.cash_type_สาขาชดใช้))
          : "-";
      sum_cash_type_สาขาชดใช้ +=
        obj.cash_price === "50" && obj.cash_type_สาขาชดใช้
          ? parseFloat(obj.cash_type_สาขาชดใช้)
          : 0.0;
      sheet.getCell("H" + (row + 4)).font = fontTableDetail;
      sheet.getCell("H" + (row + 4)).alignment = alignmentCenter;
      sheet.getCell("H" + (row + 4)).border = borderTable;
      sheet.getCell("H" + (row + 4)).value =
        obj.cash_price === "20" && obj.cash_type_สาขาชดใช้
          ? helperService.numberFormat(parseFloat(obj.cash_type_สาขาชดใช้))
          : "-";
      sum_cash_type_สาขาชดใช้ +=
        obj.cash_price === "20" && obj.cash_type_สาขาชดใช้
          ? parseFloat(obj.cash_type_สาขาชดใช้)
          : 0.0;
      sheet.getCell("H" + (row + 5)).font = fontTableDetailฺBold;
      sheet.getCell("H" + (row + 5)).alignment = alignmentCenter;
      sheet.getCell("H" + (row + 5)).border = borderTable;
      sheet.getCell("H" + (row + 5)).value = helperService.numberFormat(
        sum_cash_type_สาขาชดใช้
      );

      var sum_cash_type_ศูนย์ส่งคืน = 0;
      sheet.getCell("I" + row).font = fontTableDetail;
      sheet.getCell("I" + row).alignment = alignmentCenter;
      sheet.getCell("I" + row).border = borderTable;
      sheet.getCell("I" + row).value =
        obj.cash_price === "1000" && obj.cash_type_ศูนย์ส่งคืน
          ? helperService.numberFormat(parseFloat(obj.cash_type_ศูนย์ส่งคืน))
          : "-";
      sum_cash_type_ศูนย์ส่งคืน +=
        obj.cash_price === "1000" && obj.cash_type_ศูนย์ส่งคืน
          ? parseFloat(obj.cash_type_ศูนย์ส่งคืน)
          : 0.0;
      sheet.getCell("I" + (row + 1)).font = fontTableDetail;
      sheet.getCell("I" + (row + 1)).alignment = alignmentCenter;
      sheet.getCell("I" + (row + 1)).border = borderTable;
      sheet.getCell("I" + (row + 1)).value =
        obj.cash_price === "500" && obj.cash_type_ศูนย์ส่งคืน
          ? helperService.numberFormat(parseFloat(obj.cash_type_ศูนย์ส่งคืน))
          : "-";
      sum_cash_type_ศูนย์ส่งคืน +=
        obj.cash_price === "500" && obj.cash_type_ศูนย์ส่งคืน
          ? parseFloat(obj.cash_type_ศูนย์ส่งคืน)
          : 0.0;
      sheet.getCell("I" + (row + 2)).font = fontTableDetail;
      sheet.getCell("I" + (row + 2)).alignment = alignmentCenter;
      sheet.getCell("I" + (row + 2)).border = borderTable;
      sheet.getCell("I" + (row + 2)).value =
        obj.cash_price === "100" && obj.cash_type_ศูนย์ส่งคืน
          ? helperService.numberFormat(parseFloat(obj.cash_type_ศูนย์ส่งคืน))
          : "-";
      sum_cash_type_ศูนย์ส่งคืน +=
        obj.cash_price === "100" && obj.cash_type_ศูนย์ส่งคืน
          ? parseFloat(obj.cash_type_ศูนย์ส่งคืน)
          : 0.0;
      sheet.getCell("I" + (row + 3)).font = fontTableDetail;
      sheet.getCell("I" + (row + 3)).alignment = alignmentCenter;
      sheet.getCell("I" + (row + 3)).border = borderTable;
      sheet.getCell("I" + (row + 3)).value =
        obj.cash_price === "50" && obj.cash_type_ศูนย์ส่งคืน
          ? helperService.numberFormat(parseFloat(obj.cash_type_ศูนย์ส่งคืน))
          : "-";
      sum_cash_type_ศูนย์ส่งคืน +=
        obj.cash_price === "50" && obj.cash_type_ศูนย์ส่งคืน
          ? parseFloat(obj.cash_type_ศูนย์ส่งคืน)
          : 0.0;
      sheet.getCell("I" + (row + 4)).font = fontTableDetail;
      sheet.getCell("I" + (row + 4)).alignment = alignmentCenter;
      sheet.getCell("I" + (row + 4)).border = borderTable;
      sheet.getCell("I" + (row + 4)).value =
        obj.cash_price === "20" && obj.cash_type_ศูนย์ส่งคืน
          ? helperService.numberFormat(parseFloat(obj.cash_type_ศูนย์ส่งคืน))
          : "-";
      sum_cash_type_ศูนย์ส่งคืน +=
        obj.cash_price === "20" && obj.cash_type_ศูนย์ส่งคืน
          ? parseFloat(obj.cash_type_ศูนย์ส่งคืน)
          : 0.0;
      sheet.getCell("I" + (row + 5)).font = fontTableDetailฺBold;
      sheet.getCell("I" + (row + 5)).alignment = alignmentCenter;
      sheet.getCell("I" + (row + 5)).border = borderTable;
      sheet.getCell("I" + (row + 5)).value = helperService.numberFormat(
        sum_cash_type_ศูนย์ส่งคืน
      );

      checkDate = obj.document_date;
    } else {
      if (obj.cash_type_ขาด) {
        var sum = 0;
        if (obj.cash_price === "1000") {
          sheet.getCell("D" + row).font = fontTableDetail;
          sheet.getCell("D" + row).alignment = alignmentCenter;
          sheet.getCell("D" + row).border = borderTable;
          sheet.getCell("D" + row).value = obj.cash_type_ขาด
            ? helperService.numberFormat(parseFloat(obj.cash_type_ขาด))
            : "-";
          sum += !obj.cash_type_ขาด ? 0.0 : parseFloat(obj.cash_type_ขาด);
        } else if (obj.cash_price === "500") {
          sheet.getCell("D" + (row + 1)).font = fontTableDetail;
          sheet.getCell("D" + (row + 1)).alignment = alignmentCenter;
          sheet.getCell("D" + (row + 1)).border = borderTable;
          sheet.getCell("D" + (row + 1)).value = obj.cash_type_ขาด
            ? helperService.numberFormat(parseFloat(obj.cash_type_ขาด))
            : "-";
          sum += !obj.cash_type_ขาด ? 0.0 : parseFloat(obj.cash_type_ขาด);
        } else if (obj.cash_price === "100") {
          sheet.getCell("D" + (row + 2)).font = fontTableDetail;
          sheet.getCell("D" + (row + 2)).alignment = alignmentCenter;
          sheet.getCell("D" + (row + 2)).border = borderTable;
          sheet.getCell("D" + (row + 2)).value = obj.cash_type_ขาด
            ? helperService.numberFormat(parseFloat(obj.cash_type_ขาด))
            : "-";
          sum += !obj.cash_type_ขาด ? 0.0 : parseFloat(obj.cash_type_ขาด);
        } else if (obj.cash_price === "50") {
          sheet.getCell("D" + (row + 3)).font = fontTableDetail;
          sheet.getCell("D" + (row + 3)).alignment = alignmentCenter;
          sheet.getCell("D" + (row + 3)).border = borderTable;
          sheet.getCell("D" + (row + 3)).value = obj.cash_type_ขาด
            ? helperService.numberFormat(parseFloat(obj.cash_type_ขาด))
            : "-";
          sum += !obj.cash_type_ขาด ? 0.0 : parseFloat(obj.cash_type_ขาด);
        } else if (obj.cash_price === "20") {
          sheet.getCell("D" + (row + 4)).font = fontTableDetail;
          sheet.getCell("D" + (row + 4)).alignment = alignmentCenter;
          sheet.getCell("D" + (row + 4)).border = borderTable;
          sheet.getCell("D" + (row + 4)).value = obj.cash_type_ขาด
            ? helperService.numberFormat(parseFloat(obj.cash_type_ขาด))
            : "-";
          sum += !obj.cash_type_ขาด ? 0.0 : parseFloat(obj.cash_type_ขาด);
        }

        sheet.getCell("D" + (row + 5)).font = fontTableDetailฺBold;
        sheet.getCell("D" + (row + 5)).alignment = alignmentCenter;
        sheet.getCell("D" + (row + 5)).border = borderTable;
        sheet.getCell("D" + (row + 5)).value = {
          formula: `FIXED(SUM(IF(${"D" + row}="-",0,VALUE(${"D" + row})),IF(${
            "D" + (row + 1)
          }="-",0,VALUE(${"D" + (row + 1)})),IF(${
            "D" + (row + 2)
          }="-",0,VALUE(${"D" + (row + 2)})),IF(${
            "D" + (row + 3)
          }="-",0,VALUE(${"D" + (row + 3)})),IF(${
            "D" + (row + 4)
          }="-",0,VALUE(${"D" + (row + 4)}))),2)`,
        };
      } else if (obj.cash_type_ปลอม) {
        var sum = 0;
        if (obj.cash_price === "1000") {
          sheet.getCell("E" + row).font = fontTableDetail;
          sheet.getCell("E" + row).alignment = alignmentCenter;
          sheet.getCell("E" + row).border = borderTable;
          sheet.getCell("E" + row).value = obj.cash_type_ปลอม
            ? helperService.numberFormat(parseFloat(obj.cash_type_ปลอม))
            : "-";
          sum += !obj.cash_type_ปลอม ? 0.0 : parseFloat(obj.cash_type_ปลอม);
        } else if (obj.cash_price === "500") {
          sheet.getCell("E" + (row + 1)).font = fontTableDetail;
          sheet.getCell("E" + (row + 1)).alignment = alignmentCenter;
          sheet.getCell("E" + (row + 1)).border = borderTable;
          sheet.getCell("E" + (row + 1)).value = obj.cash_type_ปลอม
            ? helperService.numberFormat(parseFloat(obj.cash_type_ปลอม))
            : "-";
          sum += !obj.cash_type_ปลอม ? 0.0 : parseFloat(obj.cash_type_ปลอม);
        } else if (obj.cash_price === "100") {
          sheet.getCell("E" + (row + 2)).font = fontTableDetail;
          sheet.getCell("E" + (row + 2)).alignment = alignmentCenter;
          sheet.getCell("E" + (row + 2)).border = borderTable;
          sheet.getCell("E" + (row + 2)).value = obj.cash_type_ปลอม
            ? helperService.numberFormat(parseFloat(obj.cash_type_ปลอม))
            : "-";
          sum += !obj.cash_type_ปลอม ? 0.0 : parseFloat(obj.cash_type_ปลอม);
        } else if (obj.cash_price === "50") {
          sheet.getCell("E" + (row + 3)).font = fontTableDetail;
          sheet.getCell("E" + (row + 3)).alignment = alignmentCenter;
          sheet.getCell("E" + (row + 3)).border = borderTable;
          sheet.getCell("E" + (row + 3)).value = obj.cash_type_ปลอม
            ? helperService.numberFormat(parseFloat(obj.cash_type_ปลอม))
            : "-";
          sum += !obj.cash_type_ปลอม ? 0.0 : parseFloat(obj.cash_type_ปลอม);
        } else if (obj.cash_price === "20") {
          sheet.getCell("E" + (row + 4)).font = fontTableDetail;
          sheet.getCell("E" + (row + 4)).alignment = alignmentCenter;
          sheet.getCell("E" + (row + 4)).border = borderTable;
          sheet.getCell("E" + (row + 4)).value = obj.cash_type_ปลอม
            ? helperService.numberFormat(parseFloat(obj.cash_type_ปลอม))
            : "-";
          sum += !obj.cash_type_ปลอม ? 0.0 : parseFloat(obj.cash_type_ขาด);
        }

        sheet.getCell("E" + (row + 5)).font = fontTableDetailฺBold;
        sheet.getCell("E" + (row + 5)).alignment = alignmentCenter;
        sheet.getCell("E" + (row + 5)).border = borderTable;
        sheet.getCell("E" + (row + 5)).value = {
          formula: `FIXED(SUM(IF(${"E" + row}="-",0,VALUE(${"E" + row})),IF(${
            "E" + (row + 1)
          }="-",0,VALUE(${"E" + (row + 1)})),IF(${
            "E" + (row + 2)
          }="-",0,VALUE(${"E" + (row + 2)})),IF(${
            "E" + (row + 3)
          }="-",0,VALUE(${"E" + (row + 3)})),IF(${
            "E" + (row + 4)
          }="-",0,VALUE(${"E" + (row + 4)}))),2)`,
        };
      } else if (obj.cash_type_ชำรุด) {
        var sum = 0;
        if (obj.cash_price === "1000") {
          sheet.getCell("F" + row).font = fontTableDetail;
          sheet.getCell("F" + row).alignment = alignmentCenter;
          sheet.getCell("F" + row).border = borderTable;
          sheet.getCell("F" + row).value = obj.cash_type_ชำรุด
            ? helperService.numberFormat(parseFloat(obj.cash_type_ชำรุด))
            : "-";
          sum += !obj.cash_type_ชำรุด ? 0.0 : parseFloat(obj.cash_type_ชำรุด);
        } else if (obj.cash_price === "500") {
          sheet.getCell("F" + (row + 1)).font = fontTableDetail;
          sheet.getCell("F" + (row + 1)).alignment = alignmentCenter;
          sheet.getCell("F" + (row + 1)).border = borderTable;
          sheet.getCell("F" + (row + 1)).value = obj.cash_type_ชำรุด
            ? helperService.numberFormat(parseFloat(obj.cash_type_ชำรุด))
            : "-";
          sum += !obj.cash_type_ชำรุด ? 0.0 : parseFloat(obj.cash_type_ชำรุด);
        } else if (obj.cash_price === "100") {
          sheet.getCell("F" + (row + 2)).font = fontTableDetail;
          sheet.getCell("F" + (row + 2)).alignment = alignmentCenter;
          sheet.getCell("F" + (row + 2)).border = borderTable;
          sheet.getCell("F" + (row + 2)).value = obj.cash_type_ชำรุด
            ? helperService.numberFormat(parseFloat(obj.cash_type_ชำรุด))
            : "-";
          sum += !obj.cash_type_ชำรุด ? 0.0 : parseFloat(obj.cash_type_ชำรุด);
        } else if (obj.cash_price === "50") {
          sheet.getCell("F" + (row + 3)).font = fontTableDetail;
          sheet.getCell("F" + (row + 3)).alignment = alignmentCenter;
          sheet.getCell("F" + (row + 3)).border = borderTable;
          sheet.getCell("F" + (row + 3)).value = obj.cash_type_ชำรุด
            ? helperService.numberFormat(parseFloat(obj.cash_type_ชำรุด))
            : "-";
          sum += !obj.cash_type_ชำรุด ? 0.0 : parseFloat(obj.cash_type_ชำรุด);
        } else if (obj.cash_price === "20") {
          sheet.getCell("F" + (row + 4)).font = fontTableDetail;
          sheet.getCell("F" + (row + 4)).alignment = alignmentCenter;
          sheet.getCell("F" + (row + 4)).border = borderTable;
          sheet.getCell("F" + (row + 4)).value = obj.cash_type_ชำรุด
            ? helperService.numberFormat(parseFloat(obj.cash_type_ชำรุด))
            : "-";
          sum += !obj.cash_type_ชำรุด ? 0.0 : parseFloat(obj.cash_type_ชำรุด);
        }

        sheet.getCell("F" + (row + 5)).font = fontTableDetailฺBold;
        sheet.getCell("F" + (row + 5)).alignment = alignmentCenter;
        sheet.getCell("F" + (row + 5)).border = borderTable;
        sheet.getCell("F" + (row + 5)).value = {
          formula: `FIXED(SUM(IF(${"F" + row}="-",0,VALUE(${"F" + row})),IF(${
            "F" + (row + 1)
          }="-",0,VALUE(${"F" + (row + 1)})),IF(${
            "F" + (row + 2)
          }="-",0,VALUE(${"F" + (row + 2)})),IF(${
            "F" + (row + 3)
          }="-",0,VALUE(${"F" + (row + 3)})),IF(${
            "F" + (row + 4)
          }="-",0,VALUE(${"F" + (row + 4)}))),2)`,
        };
      } else if (obj.cash_type_เกิน) {
        var sum = 0;
        if (obj.cash_price === "1000") {
          sheet.getCell("G" + row).font = fontTableDetail;
          sheet.getCell("G" + row).alignment = alignmentCenter;
          sheet.getCell("G" + row).border = borderTable;
          sheet.getCell("G" + row).value = obj.cash_type_เกิน
            ? helperService.numberFormat(parseFloat(obj.cash_type_เกิน))
            : "-";
          sum += !obj.cash_type_เกิน ? 0.0 : parseFloat(obj.cash_type_เกิน);
        } else if (obj.cash_price === "500") {
          sheet.getCell("G" + (row + 1)).font = fontTableDetail;
          sheet.getCell("G" + (row + 1)).alignment = alignmentCenter;
          sheet.getCell("G" + (row + 1)).border = borderTable;
          sheet.getCell("G" + (row + 1)).value = obj.cash_type_เกิน
            ? helperService.numberFormat(parseFloat(obj.cash_type_เกิน))
            : "-";
          sum += !obj.cash_type_เกิน ? 0.0 : parseFloat(obj.cash_type_เกิน);
        } else if (obj.cash_price === "100") {
          sheet.getCell("G" + (row + 2)).font = fontTableDetail;
          sheet.getCell("G" + (row + 2)).alignment = alignmentCenter;
          sheet.getCell("G" + (row + 2)).border = borderTable;
          sheet.getCell("G" + (row + 2)).value = obj.cash_type_เกิน
            ? helperService.numberFormat(parseFloat(obj.cash_type_เกิน))
            : "-";
          sum += !obj.cash_type_เกิน ? 0.0 : parseFloat(obj.cash_type_เกิน);
        } else if (obj.cash_price === "50") {
          sheet.getCell("G" + (row + 3)).font = fontTableDetail;
          sheet.getCell("G" + (row + 3)).alignment = alignmentCenter;
          sheet.getCell("G" + (row + 3)).border = borderTable;
          sheet.getCell("G" + (row + 3)).value = obj.cash_type_เกิน
            ? helperService.numberFormat(parseFloat(obj.cash_type_เกิน))
            : "-";
          sum += !obj.cash_type_เกิน ? 0.0 : parseFloat(obj.cash_type_เกิน);
        } else if (obj.cash_price === "20") {
          sheet.getCell("G" + (row + 4)).font = fontTableDetail;
          sheet.getCell("G" + (row + 4)).alignment = alignmentCenter;
          sheet.getCell("G" + (row + 4)).border = borderTable;
          sheet.getCell("G" + (row + 4)).value = obj.cash_type_เกิน
            ? helperService.numberFormat(parseFloat(obj.cash_type_เกิน))
            : "-";
          sum += !obj.cash_type_เกิน ? 0.0 : parseFloat(obj.cash_type_เกิน);
        }

        sheet.getCell("G" + (row + 5)).font = fontTableDetailฺBold;
        sheet.getCell("G" + (row + 5)).alignment = alignmentCenter;
        sheet.getCell("G" + (row + 5)).border = borderTable;
        sheet.getCell("G" + (row + 5)).value = {
          formula: `FIXED(SUM(IF(${"G" + row}="-",0,VALUE(${"G" + row})),IF(${
            "G" + (row + 1)
          }="-",0,VALUE(${"G" + (row + 1)})),IF(${
            "G" + (row + 2)
          }="-",0,VALUE(${"G" + (row + 2)})),IF(${
            "G" + (row + 3)
          }="-",0,VALUE(${"G" + (row + 3)})),IF(${
            "G" + (row + 4)
          }="-",0,VALUE(${"G" + (row + 4)}))),2)`,
        };
      } else if (obj.cash_type_สาขาชดใช้) {
        var sum = 0;
        if (obj.cash_price === "1000") {
          sheet.getCell("H" + row).font = fontTableDetail;
          sheet.getCell("H" + row).alignment = alignmentCenter;
          sheet.getCell("H" + row).border = borderTable;
          sheet.getCell("H" + row).value = obj.cash_type_สาขาชดใช้
            ? helperService.numberFormat(parseFloat(obj.cash_type_สาขาชดใช้))
            : "-";
          sum += !obj.cash_type_สาขาชดใช้
            ? 0.0
            : parseFloat(obj.cash_type_สาขาชดใช้);
        } else if (obj.cash_price === "500") {
          sheet.getCell("H" + (row + 1)).font = fontTableDetail;
          sheet.getCell("H" + (row + 1)).alignment = alignmentCenter;
          sheet.getCell("H" + (row + 1)).border = borderTable;
          sheet.getCell("H" + (row + 1)).value = obj.cash_type_สาขาชดใช้
            ? helperService.numberFormat(parseFloat(obj.cash_type_สาขาชดใช้))
            : "-";
          sum += !obj.cash_type_สาขาชดใช้
            ? 0.0
            : parseFloat(obj.cash_type_สาขาชดใช้);
        } else if (obj.cash_price === "100") {
          sheet.getCell("H" + (row + 2)).font = fontTableDetail;
          sheet.getCell("H" + (row + 2)).alignment = alignmentCenter;
          sheet.getCell("H" + (row + 2)).border = borderTable;
          sheet.getCell("H" + (row + 2)).value = obj.cash_type_สาขาชดใช้
            ? helperService.numberFormat(parseFloat(obj.cash_type_สาขาชดใช้))
            : "-";
          sum += !obj.cash_type_สาขาชดใช้
            ? 0.0
            : parseFloat(obj.cash_type_สาขาชดใช้);
        } else if (obj.cash_price === "50") {
          sheet.getCell("H" + (row + 3)).font = fontTableDetail;
          sheet.getCell("H" + (row + 3)).alignment = alignmentCenter;
          sheet.getCell("H" + (row + 3)).border = borderTable;
          sheet.getCell("H" + (row + 3)).value = obj.cash_type_สาขาชดใช้
            ? helperService.numberFormat(parseFloat(obj.cash_type_สาขาชดใช้))
            : "-";
          sum += !obj.cash_type_สาขาชดใช้
            ? 0.0
            : parseFloat(obj.cash_type_สาขาชดใช้);
        } else if (obj.cash_price === "20") {
          sheet.getCell("H" + (row + 4)).font = fontTableDetail;
          sheet.getCell("H" + (row + 4)).alignment = alignmentCenter;
          sheet.getCell("H" + (row + 4)).border = borderTable;
          sheet.getCell("H" + (row + 4)).value = obj.cash_type_สาขาชดใช้
            ? helperService.numberFormat(parseFloat(obj.cash_type_สาขาชดใช้))
            : "-";
          sum += !obj.cash_type_สาขาชดใช้
            ? 0.0
            : parseFloat(obj.cash_type_สาขาชดใช้);
        }

        sheet.getCell("H" + (row + 5)).font = fontTableDetailฺBold;
        sheet.getCell("H" + (row + 5)).alignment = alignmentCenter;
        sheet.getCell("H" + (row + 5)).border = borderTable;
        sheet.getCell("H" + (row + 5)).value = {
          formula: `FIXED(SUM(IF(${"H" + row}="-",0,VALUE(${"H" + row})),IF(${
            "H" + (row + 1)
          }="-",0,VALUE(${"H" + (row + 1)})),IF(${
            "H" + (row + 2)
          }="-",0,VALUE(${"H" + (row + 2)})),IF(${
            "H" + (row + 3)
          }="-",0,VALUE(${"H" + (row + 3)})),IF(${
            "H" + (row + 4)
          }="-",0,VALUE(${"H" + (row + 4)}))),2)`,
        };
      } else if (obj.cash_type_ศูนย์ส่งคืน) {
        var sum = 0;
        if (obj.cash_price === "1000") {
          sheet.getCell("I" + row).font = fontTableDetail;
          sheet.getCell("I" + row).alignment = alignmentCenter;
          sheet.getCell("I" + row).border = borderTable;
          sheet.getCell("I" + row).value = obj.cash_type_ศูนย์ส่งคืน
            ? helperService.numberFormat(parseFloat(obj.cash_type_ศูนย์ส่งคืน))
            : "-";
          sum += !obj.cash_type_ศูนย์ส่งคืน
            ? 0.0
            : parseFloat(obj.cash_type_ศูนย์ส่งคืน);
        } else if (obj.cash_price === "500") {
          sheet.getCell("I" + (row + 1)).font = fontTableDetail;
          sheet.getCell("I" + (row + 1)).alignment = alignmentCenter;
          sheet.getCell("I" + (row + 1)).border = borderTable;
          sheet.getCell("I" + (row + 1)).value = obj.cash_type_ศูนย์ส่งคืน
            ? helperService.numberFormat(parseFloat(obj.cash_type_ศูนย์ส่งคืน))
            : "-";
          sum += !obj.cash_type_ศูนย์ส่งคืน
            ? 0.0
            : parseFloat(obj.cash_type_ศูนย์ส่งคืน);
        } else if (obj.cash_price === "100") {
          sheet.getCell("I" + (row + 2)).font = fontTableDetail;
          sheet.getCell("I" + (row + 2)).alignment = alignmentCenter;
          sheet.getCell("I" + (row + 2)).border = borderTable;
          sheet.getCell("I" + (row + 2)).value = obj.cash_type_ศูนย์ส่งคืน
            ? helperService.numberFormat(parseFloat(obj.cash_type_ศูนย์ส่งคืน))
            : "-";
          sum += !obj.cash_type_ศูนย์ส่งคืน
            ? 0.0
            : parseFloat(obj.cash_type_ศูนย์ส่งคืน);
        } else if (obj.cash_price === "50") {
          sheet.getCell("I" + (row + 3)).font = fontTableDetail;
          sheet.getCell("I" + (row + 3)).alignment = alignmentCenter;
          sheet.getCell("I" + (row + 3)).border = borderTable;
          sheet.getCell("I" + (row + 3)).value = obj.cash_type_ศูนย์ส่งคืน
            ? helperService.numberFormat(parseFloat(obj.cash_type_ศูนย์ส่งคืน))
            : "-";
          sum += !obj.cash_type_ศูนย์ส่งคืน
            ? 0.0
            : parseFloat(obj.cash_type_ศูนย์ส่งคืน);
        } else if (obj.cash_price === "20") {
          sheet.getCell("I" + (row + 4)).font = fontTableDetail;
          sheet.getCell("I" + (row + 4)).alignment = alignmentCenter;
          sheet.getCell("I" + (row + 4)).border = borderTable;
          sheet.getCell("I" + (row + 4)).value = obj.cash_type_ศูนย์ส่งคืน
            ? helperService.numberFormat(parseFloat(obj.cash_type_ศูนย์ส่งคืน))
            : "-";
          sum += !obj.cash_type_ศูนย์ส่งคืน
            ? 0.0
            : parseFloat(obj.cash_type_ศูนย์ส่งคืน);
        }

        sheet.getCell("I" + (row + 5)).font = fontTableDetailฺBold;
        sheet.getCell("I" + (row + 5)).alignment = alignmentCenter;
        sheet.getCell("I" + (row + 5)).border = borderTable;
        sheet.getCell("I" + (row + 5)).value = {
          formula: `FIXED(SUM(IF(${"I" + row}="-",0,VALUE(${"I" + row})),IF(${
            "I" + (row + 1)
          }="-",0,VALUE(${"I" + (row + 1)})),IF(${
            "I" + (row + 2)
          }="-",0,VALUE(${"I" + (row + 2)})),IF(${
            "I" + (row + 3)
          }="-",0,VALUE(${"I" + (row + 3)})),IF(${
            "I" + (row + 4)
          }="-",0,VALUE(${"I" + (row + 4)}))),2)`,
        };
      }

      checkDate = obj.document_date;
    }
  });

  sendWorkbook(`${filename}`, workbook, res);
}

async function getRptCashFake(header, subheader, filename, data, res) {
  const workbook = new Excel.Workbook();
  workbook.creator = "MASP-CASH_SYSTEM";
  workbook.lastModifiedBy = "System";
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.calcProperties.fullCalcOnLoad = true;

  const sheet = workbook.addWorksheet(header);

  sheet.mergeCells("B2:L2");
  sheet.getCell("B2").font = fontHeader;
  sheet.getCell("B2").alignment = alignmentCenter;
  sheet.getCell("B2").value = header; // report name

  sheet.mergeCells("B3:L3");
  sheet.getCell("B3").font = fontSubHeader;
  sheet.getCell("B3").alignment = alignmentCenter;
  sheet.getCell("B3").value = subheader; // report date

  //draw table header
  sheet.mergeCells("B4:B5");
  sheet.getCell("B4").font = fontTableHeader;
  sheet.getCell("B4").alignment = alignmentCenter;
  sheet.getCell("B4").border = borderTable;
  sheet.getCell("B4").value = "วันที่";

  sheet.mergeCells("C4:C5");
  sheet.getCell("C4").font = fontTableHeader;
  sheet.getCell("C4").alignment = alignmentCenter;
  sheet.getCell("C4").border = borderTable;
  sheet.getCell("C4").value = "รหัสศูนย์ต้นทุน";

  sheet.mergeCells("D4:D5");
  sheet.getCell("D4").font = fontTableHeader;
  sheet.getCell("D4").alignment = alignmentCenter;
  sheet.getCell("D4").border = borderTable;
  sheet.getCell("D4").value = "สาขา";

  sheet.mergeCells("E4:E5");
  sheet.getCell("E4").font = fontTableHeader;
  sheet.getCell("E4").alignment = alignmentCenter;
  sheet.getCell("E4").border = borderTable;
  sheet.getCell("E4").value = "ศูนย์เงินสด";

  sheet.mergeCells("F4:L4");
  sheet.getCell("F4").font = fontTableHeader;
  sheet.getCell("F4").alignment = alignmentCenter;
  sheet.getCell("F4").border = borderTable;
  sheet.getCell("F4").value = "จำนวนเงิน (บาท)";

  sheet.getCell("F5").font = fontTableHeader;
  sheet.getCell("F5").alignment = alignmentCenter;
  sheet.getCell("F5").border = borderTable;
  sheet.getCell("F5").value = "1,000";

  sheet.getCell("G5").font = fontTableHeader;
  sheet.getCell("G5").alignment = alignmentCenter;
  sheet.getCell("G5").border = borderTable;
  sheet.getCell("G5").value = "500";

  sheet.getCell("H5").font = fontTableHeader;
  sheet.getCell("H5").alignment = alignmentCenter;
  sheet.getCell("H5").border = borderTable;
  sheet.getCell("H5").value = "100";

  sheet.getCell("I5").font = fontTableHeader;
  sheet.getCell("I5").alignment = alignmentCenter;
  sheet.getCell("I5").border = borderTable;
  sheet.getCell("I5").value = "50";

  sheet.getCell("J5").font = fontTableHeader;
  sheet.getCell("J5").alignment = alignmentCenter;
  sheet.getCell("J5").border = borderTable;
  sheet.getCell("J5").value = "20";

  sheet.getCell("K5").font = fontTableHeader;
  sheet.getCell("K5").alignment = alignmentCenter;
  sheet.getCell("K5").border = borderTable;
  sheet.getCell("K5").value = "อื่นๆ";

  sheet.getCell("L5").font = fontTableHeader;
  sheet.getCell("L5").alignment = alignmentCenter;
  sheet.getCell("L5").border = borderTable;
  sheet.getCell("L5").value = "รวม";

  let row = 6;
  data.map((obj) => {
    let dateTh =
      obj.document_date.substring(6, 8) +
      " " +
      helperService.covertMonthThai1(
        parseInt(obj.document_date.substring(4, 6))
      ) +
      " " +
      helperService.convertYearTh(obj.document_date.substring(0, 4));
    sheet.getCell("B" + row).font = fontTableDetail;
    sheet.getCell("B" + row).alignment = alignmentCenter;
    sheet.getCell("B" + row).border = borderTable;
    sheet.getCell("B" + row).value = dateTh;

    sheet.getCell("C" + row).font = fontTableDetail;
    sheet.getCell("C" + row).alignment = alignmentCenter;
    sheet.getCell("C" + row).border = borderTable;
    sheet.getCell("C" + row).value = obj.cost_center;

    sheet.getCell("D" + row).font = fontTableDetail;
    sheet.getCell("D" + row).alignment = alignmentCenter;
    sheet.getCell("D" + row).border = borderTable;
    sheet.getCell("D" + row).value = obj.branch_name;

    sheet.getCell("E" + row).font = fontTableDetail;
    sheet.getCell("E" + row).alignment = alignmentCenter;
    sheet.getCell("E" + row).border = borderTable;
    sheet.getCell("E" + row).value = obj.cash_center_name;

    sheet.getCell("F" + row).font = fontTableDetail;
    sheet.getCell("F" + row).alignment = alignmentCenter;
    sheet.getCell("F" + row).border = borderTable;
    sheet.getCell("F" + row).value = !obj.cash_amt_1000
      ? "-"
      : helperService.numberFormat(parseFloat(obj.cash_amt_1000));

    sheet.getCell("G" + row).font = fontTableDetail;
    sheet.getCell("G" + row).alignment = alignmentCenter;
    sheet.getCell("G" + row).border = borderTable;
    sheet.getCell("G" + row).value = !obj.cash_amt_500
      ? "-"
      : helperService.numberFormat(parseFloat(obj.cash_amt_500));

    sheet.getCell("H" + row).font = fontTableDetail;
    sheet.getCell("H" + row).alignment = alignmentCenter;
    sheet.getCell("H" + row).border = borderTable;
    sheet.getCell("H" + row).value = !obj.cash_amt_100
      ? "-"
      : helperService.numberFormat(parseFloat(obj.cash_amt_100));

    sheet.getCell("I" + row).font = fontTableDetail;
    sheet.getCell("I" + row).alignment = alignmentCenter;
    sheet.getCell("I" + row).border = borderTable;
    sheet.getCell("I" + row).value = !obj.cash_amt_50
      ? "-"
      : helperService.numberFormat(parseFloat(obj.cash_amt_50));

    sheet.getCell("J" + row).font = fontTableDetail;
    sheet.getCell("J" + row).alignment = alignmentCenter;
    sheet.getCell("J" + row).border = borderTable;
    sheet.getCell("J" + row).value = !obj.cash_amt_20
      ? "-"
      : helperService.numberFormat(parseFloat(obj.cash_amt_20));

    sheet.getCell("K" + row).font = fontTableDetail;
    sheet.getCell("K" + row).alignment = alignmentCenter;
    sheet.getCell("K" + row).border = borderTable;
    sheet.getCell("K" + row).value = !obj.cash_amt_อื่นๆ
      ? "-"
      : helperService.numberFormat(parseFloat(obj.cash_amt_อื่นๆ));

    let sum_amount =
      (!obj.cash_amt_1000 ? 0.0 : parseFloat(obj.cash_amt_1000)) +
      (!obj.cash_amt_500 ? 0.0 : parseFloat(obj.cash_amt_500)) +
      (!obj.cash_amt_100 ? 0.0 : parseFloat(obj.cash_amt_100)) +
      (!obj.cash_amt_50 ? 0.0 : parseFloat(obj.cash_amt_50)) +
      (!obj.cash_amt_20 ? 0.0 : parseFloat(obj.cash_amt_20)) +
      (!obj.cash_amt_อื่นๆ ? 0.0 : parseFloat(obj.cash_amt_อื่นๆ));

    sheet.getCell("L" + row).font = fontTableDetail;
    sheet.getCell("L" + row).alignment = alignmentCenter;
    sheet.getCell("L" + row).border = borderTable;
    sheet.getCell("L" + row).value = helperService.numberFormat(sum_amount);

    row += 1;
  });

  sendWorkbook(`${filename}`, workbook, res);
}

async function getDocumentCashRequestWithdrawDeposit(
  header,
  subheader,
  filename,
  data,
  res
) {
  const workbook = new Excel.Workbook();
  workbook.creator = "MASP-CASH_SYSTEM";
  workbook.lastModifiedBy = "System";
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.calcProperties.fullCalcOnLoad = true;

  const sheet = workbook.addWorksheet(filename);

  sheet.mergeCells("B2:P2");
  sheet.getCell("B2").font = fontHeader;
  sheet.getCell("B2").alignment = alignmentCenter;
  sheet.getCell("B2").value = header; // report name

  sheet.mergeCells("B3:P3");
  sheet.getCell("B3").font = fontSubHeader;
  sheet.getCell("B3").alignment = alignmentCenter;
  sheet.getCell("B3").value = subheader; // report date

  //draw table header
  sheet.mergeCells("B4:B5");
  sheet.getCell("B4").font = fontTableHeader;
  sheet.getCell("B4").alignment = alignmentCenter;
  sheet.getCell("B4").border = borderTable;
  sheet.getCell("B4").value = "ลำดับ";
  sheet.mergeCells("C4:C5");
  sheet.getCell("C4").font = fontTableHeader;
  sheet.getCell("C4").alignment = alignmentCenter;
  sheet.getCell("C4").border = borderTable;
  sheet.getCell("C4").value = "รหัสศูนย์ต้นทุน";
  sheet.mergeCells("D4:D5");
  sheet.getCell("D4").font = fontTableHeader;
  sheet.getCell("D4").alignment = alignmentCenter;
  sheet.getCell("D4").border = borderTable;
  sheet.getCell("D4").value = "หน่วยงาน";
  sheet.mergeCells("E4:E5");
  sheet.getCell("E4").font = fontTableHeader;
  sheet.getCell("E4").alignment = alignmentCenter;
  sheet.getCell("E4").border = borderTable;
  sheet.getCell("E4").value = "ประเภทธนบัตร";
  sheet.mergeCells("F4:K4");
  sheet.getCell("F4").font = fontTableHeader;
  sheet.getCell("F4").alignment = alignmentCenter;
  sheet.getCell("F4").border = borderTable;
  sheet.getCell("F4").value = "จำนวนมัด";
  sheet.mergeCells("F5");
  sheet.getCell("F5").font = fontTableHeader;
  sheet.getCell("F5").alignment = alignmentCenter;
  sheet.getCell("F5").border = borderTable;
  sheet.getCell("F5").value = "1,000";
  sheet.mergeCells("G5");
  sheet.getCell("G5").font = fontTableHeader;
  sheet.getCell("G5").alignment = alignmentCenter;
  sheet.getCell("G5").border = borderTable;
  sheet.getCell("G5").value = "500";
  sheet.mergeCells("H5");
  sheet.getCell("H5").font = fontTableHeader;
  sheet.getCell("H5").alignment = alignmentCenter;
  sheet.getCell("H5").border = borderTable;
  sheet.getCell("H5").value = "100";
  sheet.mergeCells("I5");
  sheet.getCell("I5").font = fontTableHeader;
  sheet.getCell("I5").alignment = alignmentCenter;
  sheet.getCell("I5").border = borderTable;
  sheet.getCell("I5").value = "50";
  sheet.mergeCells("J5");
  sheet.getCell("J5").font = fontTableHeader;
  sheet.getCell("J5").alignment = alignmentCenter;
  sheet.getCell("J5").border = borderTable;
  sheet.getCell("J5").value = "20";
  sheet.mergeCells("K5");
  sheet.getCell("K5").font = fontTableHeader;
  sheet.getCell("K5").alignment = alignmentCenter;
  sheet.getCell("K5").border = borderTable;
  sheet.getCell("K5").value = "รวม";
  sheet.mergeCells("L4:L5");
  sheet.getCell("L4").font = fontTableHeader;
  sheet.getCell("L4").alignment = alignmentCenter;
  sheet.getCell("L4").border = borderTable;
  sheet.getCell("L4").value = "จำนวนเงินรวม (บาท)";
  sheet.mergeCells("M4:M5");
  sheet.getCell("M4").font = fontTableHeader;
  sheet.getCell("M4").alignment = alignmentCenter;
  sheet.getCell("M4").border = borderTable;
  sheet.getCell("M4").value = "ซองฯชำรุด";
  sheet.mergeCells("N4:N5");
  sheet.getCell("N4").font = fontTableHeader;
  sheet.getCell("N4").alignment = alignmentCenter;
  sheet.getCell("N4").border = borderTable;
  sheet.getCell("N4").value = "ซองฯตปท.";
  sheet.mergeCells("O4:O5");
  sheet.getCell("O4").font = fontTableHeader;
  sheet.getCell("O4").alignment = alignmentCenter;
  sheet.getCell("O4").border = borderTable;
  sheet.getCell("O4").value = "ซองสลากฯ";
  sheet.mergeCells("P4:P5");
  sheet.getCell("P4").font = fontTableHeader;
  sheet.getCell("P4").alignment = alignmentCenter;
  sheet.getCell("P4").border = borderTable;
  sheet.getCell("P4").value = "หมายเหตุ";

  //set data list
  const rowsCashCenter = [],
    rowsBranch = [];
  let indexCashCenter = 0,
    indexBranch = 0;
  data.map((obj) => {
    if (
      obj.unit_type_name === "ศูนย์เงินสด" ||
      obj.unit_type_name === "ส่วนกลาง"
    ) {
      indexCashCenter += 1;
      var list = [];
      let sum_collect =
        parseFloat(!obj.cash_amt_1000 ? 0 : obj.cash_amt_1000) +
        parseFloat(!obj.cash_amt_500 ? 0 : obj.cash_amt_500) +
        parseFloat(!obj.cash_amt_100 ? 0 : obj.cash_amt_100) +
        parseFloat(!obj.cash_amt_50 ? 0 : obj.cash_amt_50) +
        parseFloat(!obj.cash_amt_20 ? 0 : obj.cash_amt_20);
      let sum_cash_amount =
        helperService.coventCashCollectToCashAmount(
          !obj.cash_amt_1000
            ? 0
            : helperService.numberFormat(parseFloat(obj.cash_amt_1000)),
          1000
        ) +
        helperService.coventCashCollectToCashAmount(
          !obj.cash_amt_500
            ? 0
            : helperService.numberFormat(parseFloat(obj.cash_amt_500)),
          500
        ) +
        helperService.coventCashCollectToCashAmount(
          !obj.cash_amt_100
            ? 0
            : helperService.numberFormat(parseFloat(obj.cash_amt_100)),
          100
        ) +
        helperService.coventCashCollectToCashAmount(
          !obj.cash_amt_50
            ? 0
            : helperService.numberFormat(parseFloat(obj.cash_amt_50)),
          50
        ) +
        helperService.coventCashCollectToCashAmount(
          !obj.cash_amt_20
            ? 0
            : helperService.numberFormat(parseFloat(obj.cash_amt_20)),
          20
        );
      list.push(indexCashCenter);
      list.push(obj.unit_code);
      list.push(obj.unit_name);
      list.push(obj.cash_type);
      list.push(
        !obj.cash_amt_1000
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_1000))
      );
      list.push(
        !obj.cash_amt_500
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_500))
      );
      list.push(
        !obj.cash_amt_100
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_100))
      );
      list.push(
        !obj.cash_amt_50
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_50))
      );
      list.push(
        !obj.cash_amt_20
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_20))
      );

      list.push(
        !obj.cash_amt_20
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_20))
      );

      list.push(!sum_collect ? "-" : sum_collect);
      list.push(
        !sum_cash_amount
          ? "-"
          : helperService.numberFormat(parseFloat(sum_cash_amount))
      );
      list.push(!obj.other_cash_type_1 ? "" : "✔");
      list.push(!obj.other_cash_type_2 ? "" : "✔");
      list.push(!obj.other_cash_type_3 ? "" : "✔");
      list.push(!obj.document_remark ? "-" : obj.document_remark);

      rowsCashCenter.push(list);
    }

    if (obj.unit_type_name === "สาขา") {
      indexBranch += 1;
      var list = [];
      let sum_collect =
        parseFloat(!obj.cash_amt_1000 ? 0 : obj.cash_amt_1000) +
        parseFloat(!obj.cash_amt_500 ? 0 : obj.cash_amt_500) +
        parseFloat(!obj.cash_amt_100 ? 0 : obj.cash_amt_100) +
        parseFloat(!obj.cash_amt_50 ? 0 : obj.cash_amt_50) +
        parseFloat(!obj.cash_amt_20 ? 0 : obj.cash_amt_20);
      let sum_cash_amount =
        helperService.coventCashCollectToCashAmount(
          !obj.cash_amt_1000
            ? 0
            : helperService.numberFormat(parseFloat(obj.cash_amt_1000)),
          1000
        ) +
        helperService.coventCashCollectToCashAmount(
          !obj.cash_amt_500
            ? 0
            : helperService.numberFormat(parseFloat(obj.cash_amt_500)),
          500
        ) +
        helperService.coventCashCollectToCashAmount(
          !obj.cash_amt_100
            ? 0
            : helperService.numberFormat(parseFloat(obj.cash_amt_100)),
          100
        ) +
        helperService.coventCashCollectToCashAmount(
          !obj.cash_amt_50
            ? 0
            : helperService.numberFormat(parseFloat(obj.cash_amt_50)),
          50
        ) +
        helperService.coventCashCollectToCashAmount(
          !obj.cash_amt_20
            ? 0
            : helperService.numberFormat(parseFloat(obj.cash_amt_20)),
          20
        );
      list.push(indexBranch);
      list.push(obj.unit_code);
      list.push(obj.unit_name);
      list.push(obj.cash_type);
      list.push(
        !obj.cash_amt_1000
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_1000))
      );
      list.push(
        !obj.cash_amt_500
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_500))
      );
      list.push(
        !obj.cash_amt_100
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_100))
      );
      list.push(
        !obj.cash_amt_50
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_50))
      );
      list.push(
        !obj.cash_amt_20
          ? "-"
          : helperService.numberFormat(parseFloat(obj.cash_amt_20))
      );
      list.push(!sum_collect ? "-" : sum_collect);
      list.push(
        !sum_cash_amount
          ? "-"
          : helperService.numberFormat(parseFloat(sum_cash_amount))
      );
      list.push(!obj.other_cash_type_1 ? "" : "✔");
      list.push(!obj.other_cash_type_2 ? "" : "✔");
      list.push(!obj.other_cash_type_3 ? "" : "✔");
      list.push(!obj.document_remark ? "-" : obj.document_remark);

      rowsBranch.push(list);
    }
  });

  //CashCenter Detail
  if (rowsCashCenter.length) {
    sheet.mergeCells("B6:P6");
    sheet.getCell("B6").font = fontTableDetailฺBold;
    sheet.getCell("B6").border = borderTable;
    sheet.getCell("B6").value = "ศูนย์เงินสด";
    var rowStartC = 7;
    for (const item of rowsCashCenter) {
      sheet.getCell("B" + rowStartC).font = fontTableDetail;
      sheet.getCell("B" + rowStartC).border = borderTable;
      sheet.getCell("B" + rowStartC).value = item[0];

      sheet.getCell("C" + rowStartC).font = fontTableDetail;
      sheet.getCell("C" + rowStartC).border = borderTable;
      sheet.getCell("C" + rowStartC).value = item[1];

      sheet.getCell("D" + rowStartC).font = fontTableDetail;
      sheet.getCell("D" + rowStartC).border = borderTable;
      sheet.getCell("D" + rowStartC).value = item[2];

      sheet.getCell("E" + rowStartC).font = fontTableDetail;
      sheet.getCell("E" + rowStartC).border = borderTable;
      sheet.getCell("E" + rowStartC).value = item[3];

      sheet.getCell("F" + rowStartC).font = fontTableDetail;
      sheet.getCell("F" + rowStartC).border = borderTable;
      sheet.getCell("F" + rowStartC).value = item[4];

      sheet.getCell("G" + rowStartC).font = fontTableDetail;
      sheet.getCell("G" + rowStartC).border = borderTable;
      sheet.getCell("G" + rowStartC).value = item[5];

      sheet.getCell("H" + rowStartC).font = fontTableDetail;
      sheet.getCell("H" + rowStartC).border = borderTable;
      sheet.getCell("H" + rowStartC).value = item[6];

      sheet.getCell("I" + rowStartC).font = fontTableDetail;
      sheet.getCell("I" + rowStartC).border = borderTable;
      sheet.getCell("I" + rowStartC).value = item[7];

      sheet.getCell("J" + rowStartC).font = fontTableDetail;
      sheet.getCell("J" + rowStartC).border = borderTable;
      sheet.getCell("J" + rowStartC).value = item[8];

      sheet.getCell("K" + rowStartC).font = fontTableDetail;
      sheet.getCell("K" + rowStartC).border = borderTable;
      sheet.getCell("K" + rowStartC).value = item[9];

      sheet.getCell("L" + rowStartC).font = fontTableDetail;
      sheet.getCell("L" + rowStartC).border = borderTable;
      sheet.getCell("L" + rowStartC).value = item[10];

      sheet.getCell("M" + rowStartC).font = fontTableDetail;
      sheet.getCell("M" + rowStartC).border = borderTable;
      sheet.getCell("M" + rowStartC).value = item[11];

      sheet.getCell("N" + rowStartC).font = fontTableDetail;
      sheet.getCell("N" + rowStartC).border = borderTable;
      sheet.getCell("N" + rowStartC).value = item[12];

      sheet.getCell("O" + rowStartC).font = fontTableDetail;
      sheet.getCell("O" + rowStartC).border = borderTable;
      sheet.getCell("O" + rowStartC).value = item[13];

      sheet.getCell("P" + rowStartC).font = fontTableDetail;
      sheet.getCell("P" + rowStartC).border = borderTable;
      sheet.getCell("P" + rowStartC).value = item[14];

      rowStartC += 1;
    }
  }

  //Branch Detail
  if (rowsBranch.length) {
    sheet.mergeCells("B" + rowStartC + ":P" + rowStartC);
    sheet.getCell("B" + rowStartC + ":P" + rowStartC).font =
      fontTableDetailฺBold;
    sheet.getCell("B" + rowStartC + ":P" + rowStartC).border = borderTable;
    sheet.getCell("B" + rowStartC + ":P" + rowStartC).value = "สาขา";
    var rowStartB = rowStartC + 1;
    for (const item of rowsBranch) {
      sheet.getCell("B" + rowStartB).font = fontTableDetail;
      sheet.getCell("B" + rowStartB).border = borderTable;
      sheet.getCell("B" + rowStartB).value = item[0];

      sheet.getCell("C" + rowStartB).font = fontTableDetail;
      sheet.getCell("C" + rowStartB).border = borderTable;
      sheet.getCell("C" + rowStartB).value = item[1];

      sheet.getCell("D" + rowStartB).font = fontTableDetail;
      sheet.getCell("D" + rowStartB).border = borderTable;
      sheet.getCell("D" + rowStartB).value = item[2];

      sheet.getCell("E" + rowStartB).font = fontTableDetail;
      sheet.getCell("E" + rowStartB).border = borderTable;
      sheet.getCell("E" + rowStartB).value = item[3];

      sheet.getCell("F" + rowStartB).font = fontTableDetail;
      sheet.getCell("F" + rowStartB).border = borderTable;
      sheet.getCell("F" + rowStartB).value = item[4];

      sheet.getCell("G" + rowStartB).font = fontTableDetail;
      sheet.getCell("G" + rowStartB).border = borderTable;
      sheet.getCell("G" + rowStartB).value = item[5];

      sheet.getCell("H" + rowStartB).font = fontTableDetail;
      sheet.getCell("H" + rowStartB).border = borderTable;
      sheet.getCell("H" + rowStartB).value = item[6];

      sheet.getCell("I" + rowStartB).font = fontTableDetail;
      sheet.getCell("I" + rowStartB).border = borderTable;
      sheet.getCell("I" + rowStartB).value = item[7];

      sheet.getCell("J" + rowStartB).font = fontTableDetail;
      sheet.getCell("J" + rowStartB).border = borderTable;
      sheet.getCell("J" + rowStartB).value = item[8];

      sheet.getCell("K" + rowStartB).font = fontTableDetail;
      sheet.getCell("K" + rowStartB).border = borderTable;
      sheet.getCell("K" + rowStartB).value = item[9];

      sheet.getCell("L" + rowStartB).font = fontTableDetail;
      sheet.getCell("L" + rowStartB).border = borderTable;
      sheet.getCell("L" + rowStartB).value = item[10];

      sheet.getCell("M" + rowStartB).font = fontTableDetail;
      sheet.getCell("M" + rowStartB).border = borderTable;
      sheet.getCell("M" + rowStartB).value = item[11];

      sheet.getCell("N" + rowStartB).font = fontTableDetail;
      sheet.getCell("N" + rowStartB).border = borderTable;
      sheet.getCell("N" + rowStartB).value = item[12];

      sheet.getCell("O" + rowStartB).font = fontTableDetail;
      sheet.getCell("O" + rowStartB).border = borderTable;
      sheet.getCell("O" + rowStartB).value = item[13];

      sheet.getCell("P" + rowStartB).font = fontTableDetail;
      sheet.getCell("P" + rowStartB).border = borderTable;
      sheet.getCell("P" + rowStartB).value = item[14];

      rowStartB += 1;
    }
  }

  sendWorkbook(`${filename}`, workbook, res);
}

async function getRptCashRequestCashCenter(
  header,
  filename,
  cashCenterName,
  transType,
  data,
  res
) {
  const workbook = new Excel.Workbook();
  workbook.creator = "MASP-CASH_SYSTEM";
  workbook.lastModifiedBy = "System";
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.calcProperties.fullCalcOnLoad = true;

  const sheet = workbook.addWorksheet("ความต้องการฝากถอนธนบัตร");

  if (transType === "ฝาก" || transType === "ถอน") {
    //SetData
    var documentNo = "";
    var receiveDate = "";
    var userTransaction = "";
    var timeTransaction = "";
    var createBy = "";
    var createDateTime = "";
    var approveBy = "";
    var approveDateTime = "";
    var remark = "";
    var detailList = [];
    var sumCashCollect = 0;
    var sumCashAmount = 0;
    var lastRow = 0;
    //Set Data Detail
    data.map((obj) => {
      var list = [];
      documentNo = obj.document_no;
      receiveDate =
        obj.rec_send_date.substring(6, 8) +
        " " +
        helperService.covertMonthThai1(obj.rec_send_date.substring(4, 6)) +
        " " +
        helperService.convertYearTh(obj.rec_send_date.substring(0, 4));
      createBy = obj.create_by;
      createDateTime =
        obj.create_datetime.substring(8, 10) +
        " " +
        helperService.covertMonthThai2(obj.create_datetime.substring(5, 7)) +
        " " +
        helperService.convertYearTh(obj.create_datetime.substring(0, 4)) +
        " " +
        obj.create_datetime.substring(11, 16) +
        " น.";
      approveBy = obj.approve_by;
      approveDateTime =
        obj.approve_datetime.substring(8, 10) +
        " " +
        helperService.covertMonthThai2(obj.approve_datetime.substring(5, 7)) +
        " " +
        helperService.convertYearTh(obj.approve_datetime.substring(0, 4)) +
        " " +
        obj.approve_datetime.substring(11, 16) +
        " น.";
      remark = obj.document_remark;

      list.push(obj.cash_amt);
      list.push(obj.cash_type);
      list.push(
        obj.cash_collect_amount !== 0
          ? helperService.covertCashCollectToCashBank(obj.cash_collect_amount)
          : "-"
      );
      list.push(obj.cash_collect_amount !== 0 ? obj.cash_collect_amount : "-");
      list.push(obj.cash_amount !== 0 ? obj.cash_amount : "-");

      sumCashCollect +=
        obj.cash_collect_amount !== 0 ? obj.cash_collect_amount : 0;
      sumCashAmount += obj.cash_amount !== 0 ? obj.cash_amount : 0;

      detailList.push(list);
    });

    sheet.mergeCells("B2:G2");
    sheet.getCell("B2").font = fontHeader;
    sheet.getCell("B2").alignment = alignmentCenter;
    sheet.getCell("B2").value = "ความต้องการ " + transType + " ธนบัตร"; // report name

    sheet.mergeCells("B3:G3");
    sheet.getCell("B3").font = fontSubHeader;
    sheet.getCell("B3").alignment = alignmentCenter;
    sheet.getCell("B3").value = cashCenterName; // report date

    sheet.getCell("B5").font = fontTableDetailฺBold;
    sheet.getCell("B5").value = "เลขที่เอกสาร";
    sheet.mergeCells("C5:D5");
    sheet.getCell("C5").font = fontTableDetail;
    sheet.getCell("C5").value = documentNo;
    sheet.getCell("E5").font = fontTableDetailฺBold;
    sheet.getCell("E5").value = "วันที่รับส่ง";
    sheet.mergeCells("F5:G5");
    sheet.getCell("F5").font = fontTableDetail;
    sheet.getCell("F5").value = receiveDate;

    sheet.getCell("B6").font = fontTableDetailฺBold;
    sheet.getCell("B6").value = "ผู้ทำธุรกรรม";
    sheet.mergeCells("C6:D6");
    sheet.getCell("C6").font = fontTableDetail;
    sheet.getCell("C6").value = userTransaction;
    sheet.getCell("E6").font = fontTableDetailฺBold;
    sheet.getCell("E6").value = "เวลาทำธุกรรรม";
    sheet.mergeCells("F6:G6");
    sheet.getCell("F6").font = fontTableDetail;
    sheet.getCell("F6").value = timeTransaction;

    sheet.getCell("B7").font = fontTableDetailฺBold;
    sheet.getCell("B7").value = "ผู้บันทึก";
    sheet.mergeCells("C7:D7");
    sheet.getCell("C7").font = fontTableDetail;
    sheet.getCell("C7").value = createBy;
    sheet.getCell("E7").font = fontTableDetailฺBold;
    sheet.getCell("E7").value = "ผู้อนุมัติ";
    sheet.mergeCells("F7:G7");
    sheet.getCell("F7").font = fontTableDetail;
    sheet.getCell("F7").value = approveBy;

    sheet.mergeCells("C8:D8");
    sheet.getCell("C8").font = fontTableDetail;
    sheet.getCell("C8").value = createDateTime;
    sheet.mergeCells("F8:G8");
    sheet.getCell("F8").font = fontTableDetail;
    sheet.getCell("F8").value = approveDateTime;

    sheet.getCell("B9").font = fontTableDetailฺBold;
    sheet.getCell("B9").value = "หมายเหตุ";
    sheet.mergeCells("C9:G9");
    sheet.getCell("C9").font = fontTableDetail;
    sheet.getCell("C9").value = remark;

    sheet.mergeCells("B11:C11");
    sheet.getCell("B11").border = borderTable;
    sheet.getCell("B11").alignment = alignmentCenter;
    sheet.getCell("B11").font = fontTableHeader;
    sheet.getCell("B11").value = "ชนิดราคา";
    sheet.getCell("D11").border = borderTable;
    sheet.getCell("D11").alignment = alignmentCenter;
    sheet.getCell("D11").font = fontTableHeader;
    sheet.getCell("D11").value = "ประเภท";
    sheet.getCell("E11").border = borderTable;
    sheet.getCell("E11").alignment = alignmentCenter;
    sheet.getCell("E11").font = fontTableHeader;
    sheet.getCell("E11").value = "จำนวนฉบับ";
    sheet.getCell("F11").border = borderTable;
    sheet.getCell("F11").alignment = alignmentCenter;
    sheet.getCell("F11").font = fontTableHeader;
    sheet.getCell("F11").value = "จำนวนมัด";
    sheet.getCell("G11").border = borderTable;
    sheet.getCell("G11").alignment = alignmentCenter;
    sheet.getCell("G11").font = fontTableHeader;
    sheet.getCell("G11").value = "จำนวนเงิน";

    //Loop Detail Data
    let i = 12;
    if (detailList.length) {
      for (const item of detailList) {
        sheet.mergeCells("B" + i + ":C" + i);
        sheet.getCell("B" + i).border = borderTable;
        sheet.getCell("B" + i).font = fontTableDetail;
        sheet.getCell("B" + i).value = item[0];
        sheet.getCell("D" + i).border = borderTable;
        sheet.getCell("D" + i).font = fontTableDetail;
        sheet.getCell("D" + i).value = item[1];
        sheet.getCell("E" + i).border = borderTable;
        sheet.getCell("E" + i).font = fontTableDetail;
        sheet.getCell("E" + i).value = item[2];
        sheet.getCell("F" + i).border = borderTable;
        sheet.getCell("F" + i).font = fontTableDetail;
        sheet.getCell("F" + i).value = item[3];
        sheet.getCell("G" + i).border = borderTable;
        sheet.getCell("G" + i).font = fontTableDetail;
        sheet.getCell("G" + i).value = item[4];

        i += 1;
      }
    }

    //Set last row
    lastRow = i;
    sheet.mergeCells("B" + lastRow + ":E" + lastRow);
    sheet.getCell("B" + lastRow).border = borderTable;
    sheet.getCell("B" + lastRow).alignment = alignmentCenter;
    sheet.getCell("B" + lastRow).font = fontTableDetailฺBold;
    sheet.getCell("B" + lastRow).value = "รวมจำนวนเงิน";
    sheet.getCell("F" + lastRow).border = borderTable;
    sheet.getCell("F" + lastRow).alignment = alignmentRight;
    sheet.getCell("F" + lastRow).font = fontTableDetailฺBold;
    sheet.getCell("F" + lastRow).value =
      helperService.numberFormat(sumCashCollect);
    sheet.getCell("G" + lastRow).border = borderTable;
    sheet.getCell("G" + lastRow).alignment = alignmentRight;
    sheet.getCell("G" + lastRow).font = fontTableDetailฺBold;
    sheet.getCell("G" + lastRow).value =
      helperService.numberFormat(sumCashAmount);
  }

  if (transType === "ALL") {
    var documentNo = "";
    var receiveDate = "";
    var userTransaction = "";
    var timeTransaction = "";
    var createBy = "";
    var createDateTime = "";
    var approveBy = "";
    var approveDateTime = "";
    var remark = "";
    var detailListDeposit = [];
    var detailListWithdraw = [];
    var sumCashCollectDeposit = 0;
    var sumCashCollectWithdraw = 0;
    var sumCashAmountDeposit = 0;
    var sumCashAmountWithdraw = 0;
    var lastRow = 0;

    //Set Data Detail
    data.map((obj) => {
      if (obj.trans_type === "ฝาก") {
        var list = [];
        documentNo = obj.document_no;
        receiveDate =
          obj.rec_send_date.substring(6, 8) +
          " " +
          helperService.covertMonthThai1(obj.rec_send_date.substring(4, 6)) +
          " " +
          helperService.convertYearTh(obj.rec_send_date.substring(0, 4));
        createBy = obj.create_by;
        createDateTime =
          obj.create_datetime.substring(8, 10) +
          " " +
          helperService.covertMonthThai2(obj.create_datetime.substring(5, 7)) +
          " " +
          helperService.convertYearTh(obj.create_datetime.substring(0, 4)) +
          " " +
          obj.create_datetime.substring(11, 16) +
          " น.";
        approveBy = obj.approve_by;
        approveDateTime =
          obj.approve_datetime.substring(8, 10) +
          " " +
          helperService.covertMonthThai2(obj.approve_datetime.substring(5, 7)) +
          " " +
          helperService.convertYearTh(obj.approve_datetime.substring(0, 4)) +
          " " +
          obj.approve_datetime.substring(11, 16) +
          " น.";
        remark = obj.document_remark;

        list.push(obj.cash_amt);
        list.push(obj.cash_type);
        list.push(
          obj.cash_collect_amount !== 0
            ? helperService.covertCashCollectToCashBank(obj.cash_collect_amount)
            : "-"
        );
        list.push(
          obj.cash_collect_amount !== 0 ? obj.cash_collect_amount : "-"
        );
        list.push(obj.cash_amount !== 0 ? obj.cash_amount : "-");

        sumCashCollectDeposit +=
          obj.cash_collect_amount !== 0 ? obj.cash_collect_amount : 0;
        sumCashAmountDeposit += obj.cash_amount !== 0 ? obj.cash_amount : 0;

        detailListDeposit.push(list);
      }

      if (obj.trans_type === "ถอน") {
        var list = [];
        documentNo = obj.document_no;
        receiveDate =
          obj.rec_send_date.substring(6, 8) +
          " " +
          helperService.covertMonthThai1(obj.rec_send_date.substring(4, 6)) +
          " " +
          helperService.convertYearTh(obj.rec_send_date.substring(0, 4));
        createBy = obj.create_by;
        createDateTime =
          obj.create_datetime.substring(8, 10) +
          " " +
          helperService.covertMonthThai2(obj.create_datetime.substring(5, 7)) +
          " " +
          helperService.convertYearTh(obj.create_datetime.substring(0, 4)) +
          " " +
          obj.create_datetime.substring(11, 16) +
          " น.";
        approveBy = obj.approve_by;
        approveDateTime =
          obj.approve_datetime.substring(8, 10) +
          " " +
          helperService.covertMonthThai2(obj.approve_datetime.substring(5, 7)) +
          " " +
          helperService.convertYearTh(obj.approve_datetime.substring(0, 4)) +
          " " +
          obj.approve_datetime.substring(11, 16) +
          " น.";
        remark = obj.document_remark;

        list.push(obj.cash_amt);
        list.push(obj.cash_type);
        list.push(
          obj.cash_collect_amount !== 0
            ? helperService.covertCashCollectToCashBank(obj.cash_collect_amount)
            : "-"
        );
        list.push(
          obj.cash_collect_amount !== 0 ? obj.cash_collect_amount : "-"
        );
        list.push(obj.cash_amount !== 0 ? obj.cash_amount : "-");

        sumCashCollectWithdraw +=
          obj.cash_collect_amount !== 0 ? obj.cash_collect_amount : 0;
        sumCashAmountWithdraw += obj.cash_amount !== 0 ? obj.cash_amount : 0;

        detailListWithdraw.push(list);
      }
    });

    //ความต้องการฝาก
    sheet.mergeCells("B2:G2");
    sheet.getCell("B2").font = fontHeader;
    sheet.getCell("B2").alignment = alignmentCenter;
    sheet.getCell("B2").value = "ความต้องการ ฝาก ธนบัตร"; // report name

    sheet.mergeCells("B3:G3");
    sheet.getCell("B3").font = fontSubHeader;
    sheet.getCell("B3").alignment = alignmentCenter;
    sheet.getCell("B3").value = cashCenterName; // report date

    sheet.getCell("B5").font = fontTableDetailฺBold;
    sheet.getCell("B5").value = "เลขที่เอกสาร";
    sheet.mergeCells("C5:D5");
    sheet.getCell("C5").font = fontTableDetail;
    sheet.getCell("C5").value = documentNo;
    sheet.getCell("E5").font = fontTableDetailฺBold;
    sheet.getCell("E5").value = "วันที่รับส่ง";
    sheet.mergeCells("F5:G5");
    sheet.getCell("F5").font = fontTableDetail;
    sheet.getCell("F5").value = receiveDate;

    sheet.getCell("B6").font = fontTableDetailฺBold;
    sheet.getCell("B6").value = "ผู้ทำธุรกรรม";
    sheet.mergeCells("C6:D6");
    sheet.getCell("C6").font = fontTableDetail;
    sheet.getCell("C6").value = userTransaction;
    sheet.getCell("E6").font = fontTableDetailฺBold;
    sheet.getCell("E6").value = "เวลาทำธุกรรรม";
    sheet.mergeCells("F6:G6");
    sheet.getCell("F6").font = fontTableDetail;
    sheet.getCell("F6").value = timeTransaction;

    sheet.getCell("B7").font = fontTableDetailฺBold;
    sheet.getCell("B7").value = "ผู้บันทึก";
    sheet.mergeCells("C7:D7");
    sheet.getCell("C7").font = fontTableDetail;
    sheet.getCell("C7").value = createBy;
    sheet.getCell("E7").font = fontTableDetailฺBold;
    sheet.getCell("E7").value = "ผู้อนุมัติ";
    sheet.mergeCells("F7:G7");
    sheet.getCell("F7").font = fontTableDetail;
    sheet.getCell("F7").value = approveBy;

    sheet.mergeCells("C8:D8");
    sheet.getCell("C8").font = fontTableDetail;
    sheet.getCell("C8").value = createDateTime;
    sheet.mergeCells("F8:G8");
    sheet.getCell("F8").font = fontTableDetail;
    sheet.getCell("F8").value = approveDateTime;

    sheet.getCell("B9").font = fontTableDetailฺBold;
    sheet.getCell("B9").value = "หมายเหตุ";
    sheet.mergeCells("C9:G9");
    sheet.getCell("C9").font = fontTableDetail;
    sheet.getCell("C9").value = remark;

    sheet.mergeCells("B11:C11");
    sheet.getCell("B11").border = borderTable;
    sheet.getCell("B11").alignment = alignmentCenter;
    sheet.getCell("B11").font = fontTableHeader;
    sheet.getCell("B11").value = "ชนิดราคา";
    sheet.getCell("D11").border = borderTable;
    sheet.getCell("D11").alignment = alignmentCenter;
    sheet.getCell("D11").font = fontTableHeader;
    sheet.getCell("D11").value = "ประเภท";
    sheet.getCell("E11").border = borderTable;
    sheet.getCell("E11").alignment = alignmentCenter;
    sheet.getCell("E11").font = fontTableHeader;
    sheet.getCell("E11").value = "จำนวนฉบับ";
    sheet.getCell("F11").border = borderTable;
    sheet.getCell("F11").alignment = alignmentCenter;
    sheet.getCell("F11").font = fontTableHeader;
    sheet.getCell("F11").value = "จำนวนมัด";
    sheet.getCell("G11").border = borderTable;
    sheet.getCell("G11").alignment = alignmentCenter;
    sheet.getCell("G11").font = fontTableHeader;
    sheet.getCell("G11").value = "จำนวนเงิน";

    //Loop Detail Data
    let i = 12;
    if (detailListDeposit.length) {
      for (const item of detailListDeposit) {
        sheet.mergeCells("B" + i + ":C" + i);
        sheet.getCell("B" + i).border = borderTable;
        sheet.getCell("B" + i).font = fontTableDetail;
        sheet.getCell("B" + i).value = item[0];
        sheet.getCell("D" + i).border = borderTable;
        sheet.getCell("D" + i).font = fontTableDetail;
        sheet.getCell("D" + i).value = item[1];
        sheet.getCell("E" + i).border = borderTable;
        sheet.getCell("E" + i).font = fontTableDetail;
        sheet.getCell("E" + i).value = item[2];
        sheet.getCell("F" + i).border = borderTable;
        sheet.getCell("F" + i).font = fontTableDetail;
        sheet.getCell("F" + i).value = item[3];
        sheet.getCell("G" + i).border = borderTable;
        sheet.getCell("G" + i).font = fontTableDetail;
        sheet.getCell("G" + i).value = item[4];

        i += 1;
      }
    }

    //Set last row
    lastRow = i;
    sheet.mergeCells("B" + lastRow + ":E" + lastRow);
    sheet.getCell("B" + lastRow).border = borderTable;
    sheet.getCell("B" + lastRow).alignment = alignmentCenter;
    sheet.getCell("B" + lastRow).font = fontTableDetailฺBold;
    sheet.getCell("B" + lastRow).value = "รวมจำนวนเงิน";
    sheet.getCell("F" + lastRow).border = borderTable;
    sheet.getCell("F" + lastRow).alignment = alignmentRight;
    sheet.getCell("F" + lastRow).font = fontTableDetailฺBold;
    sheet.getCell("F" + lastRow).value = helperService.numberFormat(
      sumCashCollectDeposit
    );
    sheet.getCell("G" + lastRow).border = borderTable;
    sheet.getCell("G" + lastRow).alignment = alignmentRight;
    sheet.getCell("G" + lastRow).font = fontTableDetailฺBold;
    sheet.getCell("G" + lastRow).value =
      helperService.numberFormat(sumCashAmountDeposit);

    lastRow += 3;

    //ความต้องการถอน
    sheet.mergeCells("B" + lastRow + ":G" + lastRow);
    sheet.getCell("B" + lastRow).font = fontHeader;
    sheet.getCell("B" + lastRow).alignment = alignmentCenter;
    sheet.getCell("B" + lastRow).value = "ความต้องการ ถอน ธนบัตร"; // report name
    lastRow += 1;

    sheet.mergeCells("B" + lastRow + ":G" + lastRow);
    sheet.getCell("B" + lastRow).font = fontSubHeader;
    sheet.getCell("B" + lastRow).alignment = alignmentCenter;
    sheet.getCell("B" + lastRow).value = cashCenterName; // report date
    lastRow += 2;

    sheet.getCell("B" + lastRow).font = fontTableDetailฺBold;
    sheet.getCell("B" + lastRow).value = "เลขที่เอกสาร";
    sheet.mergeCells("C" + lastRow + ":D" + lastRow);
    sheet.getCell("C" + lastRow).font = fontTableDetail;
    sheet.getCell("C" + lastRow).value = documentNo;
    sheet.getCell("E" + lastRow).font = fontTableDetailฺBold;
    sheet.getCell("E" + lastRow).value = "วันที่รับส่ง";
    sheet.mergeCells("F" + lastRow + ":G" + lastRow);
    sheet.getCell("F" + lastRow).font = fontTableDetail;
    sheet.getCell("F" + lastRow).value = receiveDate;
    lastRow += 1;

    sheet.getCell("B" + lastRow).font = fontTableDetailฺBold;
    sheet.getCell("B" + lastRow).value = "ผู้ทำธุรกรรม";
    sheet.mergeCells("C" + lastRow + ":D" + lastRow);
    sheet.getCell("C" + lastRow).font = fontTableDetail;
    sheet.getCell("C" + lastRow).value = userTransaction;
    sheet.getCell("E" + lastRow).font = fontTableDetailฺBold;
    sheet.getCell("E" + lastRow).value = "เวลาทำธุกรรรม";
    sheet.mergeCells("F" + lastRow + ":G" + lastRow);
    sheet.getCell("F" + lastRow).font = fontTableDetail;
    sheet.getCell("F" + lastRow).value = timeTransaction;
    lastRow += 1;

    sheet.getCell("B" + lastRow).font = fontTableDetailฺBold;
    sheet.getCell("B" + lastRow).value = "ผู้บันทึก";
    sheet.mergeCells("C" + lastRow + ":D" + lastRow);
    sheet.getCell("C" + lastRow).font = fontTableDetail;
    sheet.getCell("C" + lastRow).value = createBy;
    sheet.getCell("E" + lastRow).font = fontTableDetailฺBold;
    sheet.getCell("E" + lastRow).value = "ผู้อนุมัติ";
    sheet.mergeCells("F" + lastRow + ":G" + lastRow);
    sheet.getCell("F" + lastRow).font = fontTableDetail;
    sheet.getCell("F" + lastRow).value = approveBy;
    lastRow += 1;

    sheet.mergeCells("C" + lastRow + ":D" + lastRow);
    sheet.getCell("C" + lastRow).font = fontTableDetail;
    sheet.getCell("C" + lastRow).value = createDateTime;
    sheet.mergeCells("F" + lastRow + ":G" + lastRow);
    sheet.getCell("F" + lastRow).font = fontTableDetail;
    sheet.getCell("F" + lastRow).value = approveDateTime;
    lastRow += 1;

    sheet.getCell("B" + lastRow).font = fontTableDetailฺBold;
    sheet.getCell("B" + lastRow).value = "หมายเหตุ";
    sheet.mergeCells("C" + lastRow + ":G" + lastRow);
    sheet.getCell("C" + lastRow).font = fontTableDetail;
    sheet.getCell("C" + lastRow).value = remark;
    lastRow += 2;

    sheet.mergeCells("B" + lastRow + ":C" + lastRow);
    sheet.getCell("B" + lastRow).border = borderTable;
    sheet.getCell("B" + lastRow).alignment = alignmentCenter;
    sheet.getCell("B" + lastRow).font = fontTableHeader;
    sheet.getCell("B" + lastRow).value = "ชนิดราคา";
    sheet.getCell("D" + lastRow).border = borderTable;
    sheet.getCell("D" + lastRow).alignment = alignmentCenter;
    sheet.getCell("D" + lastRow).font = fontTableHeader;
    sheet.getCell("D" + lastRow).value = "ประเภท";
    sheet.getCell("E" + lastRow).border = borderTable;
    sheet.getCell("E" + lastRow).alignment = alignmentCenter;
    sheet.getCell("E" + lastRow).font = fontTableHeader;
    sheet.getCell("E" + lastRow).value = "จำนวนฉบับ";
    sheet.getCell("F" + lastRow).border = borderTable;
    sheet.getCell("F" + lastRow).alignment = alignmentCenter;
    sheet.getCell("F" + lastRow).font = fontTableHeader;
    sheet.getCell("F" + lastRow).value = "จำนวนมัด";
    sheet.getCell("G" + lastRow).border = borderTable;
    sheet.getCell("G" + lastRow).alignment = alignmentCenter;
    sheet.getCell("G" + lastRow).font = fontTableHeader;
    sheet.getCell("G" + lastRow).value = "จำนวนเงิน";

    //Loop Detail Data
    let j = lastRow + 1;
    if (detailListWithdraw.length) {
      for (const item of detailListWithdraw) {
        sheet.mergeCells("B" + j + ":C" + j);
        sheet.getCell("B" + j).border = borderTable;
        sheet.getCell("B" + j).font = fontTableDetail;
        sheet.getCell("B" + j).value = item[0];
        sheet.getCell("D" + j).border = borderTable;
        sheet.getCell("D" + j).font = fontTableDetail;
        sheet.getCell("D" + j).value = item[1];
        sheet.getCell("E" + j).border = borderTable;
        sheet.getCell("E" + j).font = fontTableDetail;
        sheet.getCell("E" + j).value = item[2];
        sheet.getCell("F" + j).border = borderTable;
        sheet.getCell("F" + j).font = fontTableDetail;
        sheet.getCell("F" + j).value = item[3];
        sheet.getCell("G" + j).border = borderTable;
        sheet.getCell("G" + j).font = fontTableDetail;
        sheet.getCell("G" + j).value = item[4];

        j += 1;
      }
    }

    //Set last row
    lastRow = j;
    sheet.mergeCells("B" + lastRow + ":E" + lastRow);
    sheet.getCell("B" + lastRow).border = borderTable;
    sheet.getCell("B" + lastRow).alignment = alignmentCenter;
    sheet.getCell("B" + lastRow).font = fontTableDetailฺBold;
    sheet.getCell("B" + lastRow).value = "รวมจำนวนเงิน";
    sheet.getCell("F" + lastRow).border = borderTable;
    sheet.getCell("F" + lastRow).alignment = alignmentRight;
    sheet.getCell("F" + lastRow).font = fontTableDetailฺBold;
    sheet.getCell("F" + lastRow).value = helperService.numberFormat(
      sumCashCollectWithdraw
    );
    sheet.getCell("G" + lastRow).border = borderTable;
    sheet.getCell("G" + lastRow).alignment = alignmentRight;
    sheet.getCell("G" + lastRow).font = fontTableDetailฺBold;
    sheet.getCell("G" + lastRow).value = helperService.numberFormat(
      sumCashAmountWithdraw
    );
  }

  sendWorkbook(`${filename}`, workbook, res);
}
