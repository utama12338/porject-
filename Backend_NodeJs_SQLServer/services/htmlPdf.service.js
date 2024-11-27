const fs = require("fs");
const th = require("date-fns/locale/th");
const { format, addYears } = require("date-fns");
const { downloadFilePdf, deleteFile } = require("./file.manager.service");
const htmlPdf = require("html-pdf");
const helperService = require("./helper.service");
const BAHTTEXT = require("./BAHTTEXT");

module.exports = {
  getRptCashRequestSummary,
  getRptBranchCashFailedSummary,
  getRptCenterCashFailedSummary,
  getDocumentCashRequestWithdrawDeposit,
  getRptReceiveCashConfirmByDocno,
  getRptCashRequestCashCenter,
};

const logo = "http://localhost/cash-api/img/img_bw_gsb_logo.png";

const cssStyle = `
  @font-face {
    font-family: 'THSarabunNew';
    src: url('http://localhost/cash-api/fonts/THSarabunNew.ttf') format('truetype');
  }
  body {
      font-family: 'THSarabunNew';
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    border: 1px solid black;
    background-color: #f2f2f2;
  }
  tr {
    border: none;
  }
  td {
    border: 1px solid black;
    text-align: center;
    padding: 8px;
  }
`;

async function sendPdf(name, htmlPdf, htmlContent, options, response) {
  let date = format(new Date(), "ddMMyyyyhhmmss", { locale: th });

  let fileName = `${name}-${date}.pdf`;
  let filePath = `file/${fileName}`;

  // Convert HTML to PDF
  await htmlPdf.create(htmlContent, options).toFile(filePath, (err, res) => {
    if (err) return console.error(err);
    console.log("PDF generated successfully.");
    console.log(res);
    downloadFilePdf(response, filePath, fileName);
    deleteFile(filePath);
  });
}

async function getRptCashRequestSummary(header, unitName, filename, data, res) {
  // Set the HTML content you want to convert to PDF
  var htmlContent = "<!DOCTYPE html>";
  htmlContent += "<html lang='th'>";
  htmlContent += "<head>";
  htmlContent += "<title>" + header + "</title>";
  htmlContent += "<style type='text/css'>" + cssStyle + "</style>"; // Set Css style
  htmlContent += "</head>";
  htmlContent += "<body>";
  htmlContent += "<div>";
  htmlContent += "<table>";

  //Report Title
  htmlContent += "<tr>";
  htmlContent +=
    '<td style="border: none;" colspan="16"><h3>' +
    header +
    "</h3><br/><h4>" +
    unitName +
    "</h4></td>";
  htmlContent += "</tr>";

  //Report Header
  htmlContent += "<tr>";
  htmlContent += '<th rowspan="3">วันที่</th>';
  htmlContent += '<th rowspan="3">เลขที่รายการ</th>';
  htmlContent += '<th colspan="6">ฝาก</th>';
  htmlContent += '<th colspan="7">ถอน</th>';
  htmlContent += '<th rowspan="3">หมายเหตุ</th>';
  htmlContent += "</tr>";
  htmlContent += "<tr>";
  htmlContent += '<th colspan="5">จำนวนมัด</th>';
  htmlContent += '<th rowspan="2">จำนวนเงินรวม<br/>(บาท)</th>';
  htmlContent += '<th colspan="6">จำนวนมัด</th>';
  htmlContent += '<th rowspan="2">จำนวนเงินรวม<br/>(บาท)</th>';
  htmlContent += "</tr>";
  htmlContent += "<tr>";
  htmlContent += "<th>1,000</th>";
  htmlContent += "<th>500</th>";
  htmlContent += "<th>100</th>";
  htmlContent += "<th>50</th>";
  htmlContent += "<th>20</th>";
  htmlContent += "<th>ประเภท</th>";
  htmlContent += "<th>1,000</th>";
  htmlContent += "<th>500</th>";
  htmlContent += "<th>100</th>";
  htmlContent += "<th>50</th>";
  htmlContent += "<th>20</th>";
  htmlContent += "</tr>";

  data.map((obj) => {
    let dateTh =
      obj.document_date.substring(6, 8) +
      " " +
      helperService.covertMonthThai1(
        parseInt(obj.document_date.substring(4, 6))
      ) +
      " " +
      helperService.convertYearTh(obj.document_date.substring(0, 4));

    let sumDeposit =
      helperService.coventCashCollectToCashAmount(
        !obj.cash_amt_1000_ฝาก
          ? 0
          : helperService.numberFormat(parseFloat(obj.cash_amt_1000_ฝาก)),
        1000
      ) +
      helperService.coventCashCollectToCashAmount(
        !obj.cash_amt_500_ฝาก
          ? 0
          : helperService.numberFormat(parseFloat(obj.cash_amt_500_ฝาก)),
        500
      ) +
      helperService.coventCashCollectToCashAmount(
        !obj.cash_amt_100_ฝาก
          ? 0
          : helperService.numberFormat(parseFloat(obj.cash_amt_100_ฝาก)),
        100
      ) +
      helperService.coventCashCollectToCashAmount(
        !obj.cash_amt_50_ฝาก
          ? 0
          : helperService.numberFormat(parseFloat(obj.cash_amt_50_ฝาก)),
        50
      ) +
      helperService.coventCashCollectToCashAmount(
        !obj.cash_amt_20_ฝาก
          ? 0
          : helperService.numberFormat(parseFloat(obj.cash_amt_20_ฝาก)),
        20
      );

    let sumWithDraw =
      helperService.coventCashCollectToCashAmount(
        !obj.cash_amt_1000_ถอน
          ? 0
          : helperService.numberFormat(parseFloat(obj.cash_amt_1000_ถอน)),
        1000
      ) +
      helperService.coventCashCollectToCashAmount(
        !obj.cash_amt_500_ถอน
          ? 0
          : helperService.numberFormat(parseFloat(obj.cash_amt_500_ถอน)),
        500
      ) +
      helperService.coventCashCollectToCashAmount(
        !obj.cash_amt_100_ถอน
          ? 0
          : helperService.numberFormat(parseFloat(obj.cash_amt_100_ถอน)),
        100
      ) +
      helperService.coventCashCollectToCashAmount(
        !obj.cash_amt_50_ถอน
          ? 0
          : helperService.numberFormat(parseFloat(obj.cash_amt_50_ถอน)),
        50
      ) +
      helperService.coventCashCollectToCashAmount(
        !obj.cash_amt_20_ถอน
          ? 0
          : helperService.numberFormat(parseFloat(obj.cash_amt_20_ถอน)),
        20
      );
    htmlContent += "<tr>";
    htmlContent += "<td>" + dateTh + "</td>";
    htmlContent += "<td>" + obj.document_no + "</td>";
    htmlContent += +!obj.cash_amt_1000_ฝาก
      ? "<td>-</td>"
      : "<td>" +
        helperService.numberFormat(parseFloat(obj.cash_amt_1000_ฝาก)) +
        "</td>";
    htmlContent += +!obj.cash_amt_500_ฝาก
      ? "<td>-</td>"
      : "<td>" +
        helperService.numberFormat(parseFloat(obj.cash_amt_500_ฝาก)) +
        "</td>";
    htmlContent += +!obj.cash_amt_100_ฝาก
      ? "<td>-</td>"
      : "<td>" +
        helperService.numberFormat(parseFloat(obj.cash_amt_100_ฝาก)) +
        "</td>";
    htmlContent += +!obj.cash_amt_50_ฝาก
      ? "<td>-</td>"
      : "<td>" +
        helperService.numberFormat(parseFloat(obj.cash_amt_50_ฝาก)) +
        "</td>";
    htmlContent += +!obj.cash_amt_20_ฝาก
      ? "<td>-</td>"
      : "<td>" +
        helperService.numberFormat(parseFloat(obj.cash_amt_20_ฝาก)) +
        "</td>";
    htmlContent += +!sumDeposit
      ? "<td>-</td>"
      : "<td>" + helperService.numberFormat(parseFloat(sumDeposit)) + "</td>";
    htmlContent += "<td></td>";
    htmlContent += +!obj.cash_amt_1000_ถอน
      ? "<td>-</td>"
      : "<td>" +
        helperService.numberFormat(parseFloat(obj.cash_amt_1000_ถอน)) +
        "</td>";
    htmlContent += +!obj.cash_amt_500_ถอน
      ? "<td>-</td>"
      : "<td>" +
        helperService.numberFormat(parseFloat(obj.cash_amt_500_ถอน)) +
        "</td>";
    htmlContent += +!obj.cash_amt_100_ถอน
      ? "<td>-</td>"
      : "<td>" +
        helperService.numberFormat(parseFloat(obj.cash_amt_100_ถอน)) +
        "</td>";
    htmlContent += +!obj.cash_amt_50_ถอน
      ? "<td>-</td>"
      : "<td>" +
        helperService.numberFormat(parseFloat(obj.cash_amt_50_ถอน)) +
        "</td>";
    htmlContent += +!obj.cash_amt_20_ถอน
      ? "<td>-</td>"
      : "<td>" +
        helperService.numberFormat(parseFloat(obj.cash_amt_20_ถอน)) +
        "</td>";
    htmlContent += +!sumWithDraw
      ? "<td>-</td>"
      : "<td>" + helperService.numberFormat(parseFloat(sumWithDraw)) + "</td>";
    htmlContent += !obj.document_remark
      ? "<td>ไม่มี</td>"
      : "<td>" + obj.document_remark + "</td>";

    htmlContent += "</tr>";
  });

  //Close html content
  htmlContent += "</table>";
  htmlContent += "</div>";
  htmlContent += "</body>";
  htmlContent += "</html>";

  // Options for PDF generation
  const options = {
    format: "A4", // Paper format. Can be 'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'
    orientation: "landscape", // 'portrait' or 'landscape'
    border: {
      top: "0.5in", // Top margin
      right: "0.5in", // Right margin
      bottom: "0.5in", // Bottom margin
      left: "0.5in", // Left margin
    },
  };

  sendPdf(filename, htmlPdf, htmlContent, options, res);
}

async function getRptBranchCashFailedSummary(
  header,
  unitName,
  filename,
  data,
  res
) {
  // Set the HTML content you want to convert to PDF
  var htmlContent = "<!DOCTYPE html>";
  htmlContent += "<html lang='th'>";
  htmlContent += "<head>";
  htmlContent += "<title>" + header + "</title>";
  htmlContent += "<style type='text/css'>" + cssStyle + "</style>"; // Set Css style
  htmlContent += "</head>";
  htmlContent += "<body>";
  htmlContent += "<div>";
  htmlContent += "<table>";

  //Report Title
  htmlContent += "<tr>";
  htmlContent +=
    '<td style="border: none;" colspan="17"><h3>' +
    header +
    "</h3><br/><h4>" +
    unitName +
    "</h4></td>";
  htmlContent += "</tr>";

  //Report Header
  htmlContent += "<tr>";
  htmlContent += '<th rowspan="3">วันที่</th>';
  htmlContent += '<th colspan="8">แลกค่าได้ทันที</th>';
  htmlContent += '<th colspan="8">เขียนคำร้อง</th>';
  htmlContent += "</tr>";
  htmlContent += "<tr>";
  htmlContent += '<th rowspan="2">จำนวนราย</th>';
  htmlContent += '<th colspan="7">จำนวนเงิน (บาท)</th>';
  htmlContent += '<th rowspan="2">จำนวนราย</th>';
  htmlContent += '<th colspan="7">จำนวนเงิน (บาท)</th>';
  htmlContent += "</tr>";
  htmlContent += "<tr>";
  htmlContent += "<th>1,000</th>";
  htmlContent += "<th>500</th>";
  htmlContent += "<th>100</th>";
  htmlContent += "<th>50</th>";
  htmlContent += "<th>20</th>";
  htmlContent += "<th>อื่นๆ</th>";
  htmlContent += "<th>รวม</th>";
  htmlContent += "<th>1,000</th>";
  htmlContent += "<th>500</th>";
  htmlContent += "<th>100</th>";
  htmlContent += "<th>50</th>";
  htmlContent += "<th>20</th>";
  htmlContent += "<th>อื่นๆ</th>";
  htmlContent += "<th>รวม</th>";
  htmlContent += "</tr>";

  //Set detail
  const rows = [];
  let checkDate = "",
    index = 0;
  data.map((obj) => {
    if (checkDate !== obj.document_date) {
      index === 0 ? 0 : (index += 1);
      var list = [];
      let dateTh =
        obj.document_date.substring(6, 8) +
        " " +
        helperService.covertMonthThai1(
          parseInt(obj.document_date.substring(4, 6))
        ) +
        " " +
        helperService.convertYearTh(obj.document_date.substring(0, 4));

      if (obj.cash_type === "แลกค่าได้ทันที") {
        list.push(dateTh);
        list.push(obj.cash_people_amount);
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
          !obj.cash_amt_อื่นๆ
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amt_อื่นๆ))
        );
        list.push(
          !obj.cash_amount
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amount))
        );
        list.push("-");
        list.push("-");
        list.push("-");
        list.push("-");
        list.push("-");
        list.push("-");
        list.push("-");
        list.push("-");
      }

      if (obj.cash_type === "เขียนคำร้อง") {
        list.push(dateTh);
        list.push("-");
        list.push("-");
        list.push("-");
        list.push("-");
        list.push("-");
        list.push("-");
        list.push("-");
        list.push("-");
        list.push(obj.cash_people_amount);
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
          !obj.cash_amt_อื่นๆ
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amt_อื่นๆ))
        );
        list.push(
          !obj.cash_amount
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amount))
        );
      }

      rows.push(list);
      checkDate = obj.document_date;
    } else {
      if (obj.cash_type === "แลกค่าได้ทันที") {
        rows[index].splice(1, 1, obj.cash_people_amount);
        rows[index].splice(
          2,
          1,
          !obj.cash_amt_1000
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amt_1000))
        );
        rows[index].splice(
          3,
          1,
          !obj.cash_amt_500
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amt_500))
        );
        rows[index].splice(
          4,
          1,
          !obj.cash_amt_100
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amt_100))
        );
        rows[index].splice(
          5,
          1,
          !obj.cash_amt_50
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amt_50))
        );
        rows[index].splice(
          6,
          1,
          !obj.cash_amt_20
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amt_20))
        );
        rows[index].splice(
          7,
          1,
          !obj.cash_amt_อื่นๆ
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amt_อื่นๆ))
        );
        rows[index].splice(
          8,
          1,
          !obj.cash_amount
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amount))
        );
      }

      if (obj.cash_type === "เขียนคำร้อง") {
        rows[index].splice(9, 1, obj.cash_people_amount);
        rows[index].splice(
          10,
          1,
          !obj.cash_amt_1000
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amt_1000))
        );
        rows[index].splice(
          11,
          1,
          !obj.cash_amt_500
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amt_500))
        );
        rows[index].splice(
          12,
          1,
          !obj.cash_amt_100
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amt_100))
        );
        rows[index].splice(
          13,
          1,
          !obj.cash_amt_50
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amt_50))
        );
        rows[index].splice(
          14,
          1,
          !obj.cash_amt_20
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amt_20))
        );
        rows[index].splice(
          15,
          1,
          !obj.cash_amt_อื่นๆ
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amt_อื่นๆ))
        );
        rows[index].splice(
          16,
          1,
          !obj.cash_amount
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amount))
        );
      }

      checkDate = obj.document_date;
    }
  });

  for (const item of rows) {
    htmlContent += "<tr>";
    htmlContent += "<td>" + item[0] + "</td>";
    htmlContent += "<td>" + item[1] + "</td>";
    htmlContent += "<td>" + item[2] + "</td>";
    htmlContent += "<td>" + item[3] + "</td>";
    htmlContent += "<td>" + item[4] + "</td>";
    htmlContent += "<td>" + item[5] + "</td>";
    htmlContent += "<td>" + item[6] + "</td>";
    htmlContent += "<td>" + item[7] + "</td>";
    htmlContent += "<td>" + item[8] + "</td>";
    htmlContent += "<td>" + item[9] + "</td>";
    htmlContent += "<td>" + item[10] + "</td>";
    htmlContent += "<td>" + item[11] + "</td>";
    htmlContent += "<td>" + item[12] + "</td>";
    htmlContent += "<td>" + item[13] + "</td>";
    htmlContent += "<td>" + item[14] + "</td>";
    htmlContent += "<td>" + item[15] + "</td>";
    htmlContent += "<td>" + item[16] + "</td>";
    htmlContent += "</tr>";
  }

  //Close html content
  htmlContent += "</table>";
  htmlContent += "</div>";
  htmlContent += "</body>";
  htmlContent += "</html>";

  // Options for PDF generation
  const options = {
    format: "A4", // Paper format. Can be 'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'
    orientation: "landscape", // 'portrait' or 'landscape'
    border: {
      top: "0.5in", // Top margin
      right: "0.5in", // Right margin
      bottom: "0.5in", // Bottom margin
      left: "0.5in", // Left margin
    },
  };

  sendPdf(filename, htmlPdf, htmlContent, options, res);
}

async function getRptCenterCashFailedSummary(
  header,
  subheader,
  filename,
  data,
  res
) {
  // Set the HTML content you want to convert to PDF
  var htmlContent = "<!DOCTYPE html>";
  htmlContent += "<html lang='th'>";
  htmlContent += "<head>";
  htmlContent += "<title>" + header + "</title>";
  htmlContent += "<style type='text/css'>" + cssStyle + "</style>"; // Set Css style
  htmlContent += "</head>";
  htmlContent += "<body>";
  htmlContent += "<div>";
  htmlContent += "<table>";

  //Report Title
  htmlContent += "<tr>";
  htmlContent +=
    '<td style="border: none;" colspan="20"><h3>' +
    header +
    "</h3><br/><h4>" +
    subheader +
    "</h4></td>";
  htmlContent += "</tr>";
  htmlContent += "</table>";

  htmlContent += "<table>";
  //Report Header
  htmlContent += "<thead>";
  htmlContent += "<tr>";
  htmlContent += '<th rowspan="3">วันที่</th>';
  htmlContent += '<th rowspan="3">รหัสศูนย์ต้นทุน</th>';
  htmlContent += '<th rowspan="3">สาขา</th>';
  htmlContent += '<th rowspan="3">ศูนย์เงินสด</th>';
  htmlContent += '<th colspan="8">แลกค่าได้ทันที</th>';
  htmlContent += '<th colspan="8">เขียนคำร้อง</th>';
  htmlContent += "</tr>";
  htmlContent += "<tr>";
  htmlContent += '<th rowspan="2">จำนวนราย</th>';
  htmlContent += '<th colspan="7">จำนวนเงิน (บาท)</th>';
  htmlContent += '<th rowspan="2">จำนวนราย</th>';
  htmlContent += '<th colspan="7">จำนวนเงิน (บาท)</th>';
  htmlContent += "</tr>";
  htmlContent += "<tr>";
  htmlContent += "<th>1,000</th>";
  htmlContent += "<th>500</th>";
  htmlContent += "<th>100</th>";
  htmlContent += "<th>50</th>";
  htmlContent += "<th>20</th>";
  htmlContent += "<th>อื่นๆ</th>";
  htmlContent += "<th>รวม</th>";
  htmlContent += "<th>1,000</th>";
  htmlContent += "<th>500</th>";
  htmlContent += "<th>100</th>";
  htmlContent += "<th>50</th>";
  htmlContent += "<th>20</th>";
  htmlContent += "<th>อื่นๆ</th>";
  htmlContent += "<th>รวม</th>";
  htmlContent += "</tr>";
  htmlContent += "</thead>";

  //Set detail
  const rows = [];
  let checkDate = "",
    index = 0;
  data.map((obj) => {
    if (checkDate !== obj.document_date) {
      index === 0 ? 0 : (index += 1);
      var list = [];
      let dateTh =
        obj.document_date.substring(6, 8) +
        " " +
        helperService.covertMonthThai1(
          parseInt(obj.document_date.substring(4, 6))
        ) +
        " " +
        helperService.convertYearTh(obj.document_date.substring(0, 4));

      if (obj.cash_type === "แลกค่าได้ทันที") {
        list.push(dateTh);
        list.push(obj.cost_center);
        list.push(obj.branch_name);
        list.push(obj.cash_center_name);
        list.push(obj.cash_people_amount);
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
          !obj.cash_amt_อื่นๆ
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amt_อื่นๆ))
        );
        list.push(
          !obj.cash_amount
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amount))
        );
        list.push("-");
        list.push("-");
        list.push("-");
        list.push("-");
        list.push("-");
        list.push("-");
        list.push("-");
        list.push("-");
      }

      if (obj.cash_type === "เขียนคำร้อง") {
        list.push(dateTh);
        list.push(obj.cost_center);
        list.push(obj.branch_name);
        list.push(obj.cash_center_name);
        list.push("-");
        list.push("-");
        list.push("-");
        list.push("-");
        list.push("-");
        list.push("-");
        list.push("-");
        list.push("-");
        list.push(obj.cash_people_amount);
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
          !obj.cash_amt_อื่นๆ
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amt_อื่นๆ))
        );
        list.push(
          !obj.cash_amount
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amount))
        );
      }

      rows.push(list);
      checkDate = obj.document_date;
    } else {
      if (obj.cash_type === "แลกค่าได้ทันที") {
        rows[index].splice(4, 1, obj.cash_people_amount);
        rows[index].splice(
          5,
          1,
          !obj.cash_amt_1000
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amt_1000))
        );
        rows[index].splice(
          6,
          1,
          !obj.cash_amt_500
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amt_500))
        );
        rows[index].splice(
          7,
          1,
          !obj.cash_amt_100
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amt_100))
        );
        rows[index].splice(
          8,
          1,
          !obj.cash_amt_50
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amt_50))
        );
        rows[index].splice(
          9,
          1,
          !obj.cash_amt_20
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amt_20))
        );
        rows[index].splice(
          10,
          1,
          !obj.cash_amt_อื่นๆ
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amt_อื่นๆ))
        );
        rows[index].splice(
          11,
          1,
          !obj.cash_amount
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amount))
        );
      }

      if (obj.cash_type === "เขียนคำร้อง") {
        rows[index].splice(12, 1, obj.cash_people_amount);
        rows[index].splice(
          13,
          1,
          !obj.cash_amt_1000
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amt_1000))
        );
        rows[index].splice(
          14,
          1,
          !obj.cash_amt_500
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amt_500))
        );
        rows[index].splice(
          15,
          1,
          !obj.cash_amt_100
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amt_100))
        );
        rows[index].splice(
          16,
          1,
          !obj.cash_amt_50
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amt_50))
        );
        rows[index].splice(
          17,
          1,
          !obj.cash_amt_20
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amt_20))
        );
        rows[index].splice(
          18,
          1,
          !obj.cash_amt_อื่นๆ
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amt_อื่นๆ))
        );
        rows[index].splice(
          19,
          1,
          !obj.cash_amount
            ? "-"
            : helperService.numberFormat(parseFloat(obj.cash_amount))
        );
      }

      checkDate = obj.document_date;
    }
  });
  htmlContent += "<tbody>";
  for (const item of rows) {
    htmlContent += "<tr>";
    htmlContent += "<td>" + item[0] + "</td>";
    htmlContent += "<td>" + item[1] + "</td>";
    htmlContent += "<td>" + item[2] + "</td>";
    htmlContent += "<td>" + item[3] + "</td>";
    htmlContent += "<td>" + item[4] + "</td>";
    htmlContent += "<td>" + item[5] + "</td>";
    htmlContent += "<td>" + item[6] + "</td>";
    htmlContent += "<td>" + item[7] + "</td>";
    htmlContent += "<td>" + item[8] + "</td>";
    htmlContent += "<td>" + item[9] + "</td>";
    htmlContent += "<td>" + item[10] + "</td>";
    htmlContent += "<td>" + item[11] + "</td>";
    htmlContent += "<td>" + item[12] + "</td>";
    htmlContent += "<td>" + item[13] + "</td>";
    htmlContent += "<td>" + item[14] + "</td>";
    htmlContent += "<td>" + item[15] + "</td>";
    htmlContent += "<td>" + item[16] + "</td>";
    htmlContent += "<td>" + item[17] + "</td>";
    htmlContent += "<td>" + item[18] + "</td>";
    htmlContent += "<td>" + item[19] + "</td>";
    htmlContent += "</tr>";
  }
  htmlContent += "</tbody>";

  //Close html content
  htmlContent += "</table>";
  htmlContent += "</div>";
  htmlContent += "</body>";
  htmlContent += "</html>";

  // Options for PDF generation
  const options = {
    format: "A4", // Paper format. Can be 'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'
    orientation: "landscape", // 'portrait' or 'landscape'
    border: {
      top: "0.5in", // Top margin
      right: "0.5in", // Right margin
      bottom: "0.5in", // Bottom margin
      left: "0.5in", // Left margin
    },
  };

  sendPdf(filename, htmlPdf, htmlContent, options, res);
}

async function getDocumentCashRequestWithdrawDeposit(
  header,
  subheader,
  filename,
  data,
  res
) {
  // Set the HTML content you want to convert to PDF
  var htmlContent = "<!DOCTYPE html>";
  htmlContent += "<html lang='th'>";
  htmlContent += "<head>";
  htmlContent += "<title>" + header + "</title>";
  htmlContent += "<style type='text/css'>" + cssStyle + "</style>"; // Set Css style
  htmlContent += "</head>";
  htmlContent += "<body>";
  htmlContent += "<div>";

  //Report Title
  htmlContent += "<table>";
  htmlContent += "<tr>";
  htmlContent +=
    '<td style="border: none;" colspan="15"><h3>' +
    header +
    "</h3><br/><h4>" +
    subheader +
    "</h4></td>";
  htmlContent += "</tr>";
  htmlContent += "</table>";

  htmlContent += "<table>";
  //Report Header
  htmlContent += "<thead>";
  htmlContent += "<tr>";
  htmlContent += '<th rowspan="2">ลำดับ</th>';
  htmlContent += '<th rowspan="2">รหัสศูนย์ต้นทุน</th>';
  htmlContent += '<th rowspan="2">หน่วยงาน</th>';
  htmlContent += '<th rowspan="2">ประเภทธนบัตร</th>';
  htmlContent += '<th colspan="6">จำนวนมัด</th>';
  htmlContent += '<th rowspan="2">จำนวนเงินรวม<br/>(บาท)</th>';
  htmlContent += '<th rowspan="2">ซองฯ<br/>ชำรุด</th>';
  htmlContent += '<th rowspan="2">ซองฯ<br/>ตปท.</th>';
  htmlContent += '<th rowspan="2">ซอง<br/>สลากฯ</th>';
  htmlContent += '<th rowspan="2">หมายเหตุ</th>';
  htmlContent += "</tr>";
  htmlContent += "<tr>";
  htmlContent += "<th>1,000</th>";
  htmlContent += "<th>500</th>";
  htmlContent += "<th>100</th>";
  htmlContent += "<th>50</th>";
  htmlContent += "<th>20</th>";
  htmlContent += "<th>รวม</th>";
  htmlContent += "</tr>";
  htmlContent += "</thead>";

  //Set detail
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

  htmlContent += "<tbody>";

  //CashCenter Detail
  if (rowsCashCenter.length) {
    htmlContent += "<tr>";
    htmlContent +=
      "<td colspan='15' style='background-color: #f2f2f2; text-align:left;'>ศูนย์เงินสด</td>";
    htmlContent += "</tr>";
    for (const item of rowsCashCenter) {
      htmlContent += "<tr>";
      htmlContent += "<td>" + item[0] + "</td>";
      htmlContent += "<td>" + item[1] + "</td>";
      htmlContent += "<td>" + item[2] + "</td>";
      htmlContent += "<td>" + item[3] + "</td>";
      htmlContent += "<td>" + item[4] + "</td>";
      htmlContent += "<td>" + item[5] + "</td>";
      htmlContent += "<td>" + item[6] + "</td>";
      htmlContent += "<td>" + item[7] + "</td>";
      htmlContent += "<td>" + item[8] + "</td>";
      htmlContent += "<td>" + item[9] + "</td>";
      htmlContent += "<td>" + item[10] + "</td>";
      htmlContent += "<td>" + item[11] + "</td>";
      htmlContent += "<td>" + item[12] + "</td>";
      htmlContent += "<td>" + item[13] + "</td>";
      htmlContent += "<td>" + item[14] + "</td>";
      htmlContent += "</tr>";
    }
  }

  //Branch Detail
  if (rowsBranch.length) {
    htmlContent += "<tr>";
    htmlContent +=
      "<td colspan='15' style='background-color: #f2f2f2; text-align:left;'>สาขา</td>";
    htmlContent += "</tr>";
    for (const item of rowsBranch) {
      htmlContent += "<tr>";
      htmlContent += "<td>" + item[0] + "</td>";
      htmlContent += "<td>" + item[1] + "</td>";
      htmlContent += "<td>" + item[2] + "</td>";
      htmlContent += "<td>" + item[3] + "</td>";
      htmlContent += "<td>" + item[4] + "</td>";
      htmlContent += "<td>" + item[5] + "</td>";
      htmlContent += "<td>" + item[6] + "</td>";
      htmlContent += "<td>" + item[7] + "</td>";
      htmlContent += "<td>" + item[8] + "</td>";
      htmlContent += "<td>" + item[9] + "</td>";
      htmlContent += "<td>" + item[10] + "</td>";
      htmlContent += "<td>" + item[11] + "</td>";
      htmlContent += "<td>" + item[12] + "</td>";
      htmlContent += "<td>" + item[13] + "</td>";
      htmlContent += "<td>" + item[14] + "</td>";
      htmlContent += "</tr>";
    }
  }

  htmlContent += "</tbody>";

  //Close html content
  htmlContent += "</table>";
  htmlContent += "</div>";
  htmlContent += "</body>";
  htmlContent += "</html>";

  // Options for PDF generation
  const options = {
    format: "A4", // Paper format. Can be 'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'
    orientation: "landscape", // 'portrait' or 'landscape'
    border: {
      top: "0.5in", // Top margin
      right: "0.5in", // Right margin
      bottom: "0.5in", // Bottom margin
      left: "0.5in", // Left margin
    },
  };

  sendPdf(filename, htmlPdf, htmlContent, options, res);
}

async function getRptReceiveCashConfirmByDocno(
  documentNo,
  documentDate,
  unitName,
  cashCenterName,
  sendCashData,
  receiveCashData,
  filename,
  res
) {
  // Set the HTML content you want to convert to PDF
  var htmlContent = "<!DOCTYPE html>";
  htmlContent += "<html lang='th'>";
  htmlContent += "<head>";
  htmlContent += "<title>ใบนำส่งเงิน(อส.92)/ใบถอนเงิน</title>";
  htmlContent += "<style type='text/css'>" + cssStyle + "</style>"; // Set Css style
  htmlContent += "</head>";
  htmlContent += "<body>";
  htmlContent += "<div>";

  //************ ใบนำส่งเงิน อส.92 ************
  //Title ใบนำส่งเงิน (อส.92)
  htmlContent += "<table>";
  htmlContent += "<tr>";
  htmlContent += '<td width="25%" style="border: none;"></td>';
  htmlContent +=
    '<td width="50%" style="border: none;"><img src="' +
    logo +
    '" width="100px" height="100px"></img></td>';
  htmlContent += '<td width="25%" style="border: none;"></td>';
  htmlContent +=
    '<td width="25%" style="border: none;vertical-align: bottom;"><font style="font-weight: bold;font-size: 2rem;">อส.92</font></td>';
  htmlContent += "</tr>";
  htmlContent += "<tr>";
  htmlContent +=
    '<td colspan="3" style="font-size: 24px;border: none;"><h4>' +
    unitName +
    "</h4></td>";
  htmlContent += '<td style="border: none;"></td>';
  htmlContent += "</tr>";
  htmlContent += "<tr>";
  htmlContent +=
    '<td colspan="2" style="font-size: 18px;border: none;text-align: left">ใบนำส่งเงิน เลขที่ ' +
    documentNo +
    "</td>";
  htmlContent +=
    '<td colspan="2" style="font-size: 18px;text-align: right;border: none;">วันที่ ' +
    documentDate +
    "</td>";
  htmlContent += "</tr>";
  htmlContent += "</table>";

  //Detail ใบนำส่งเงิน (อส.92)
  htmlContent += "<table>";
  htmlContent += "<tr>";
  htmlContent +=
    '<td colspan="2" style="font-size: 18px;text-align: left; border: none;">ข้าพเจ้าขอนำส่งเงินตามรายการ ต่อไปนี้</td>';
  htmlContent += "</tr>";
  htmlContent += "<tr>";
  htmlContent += '<th colspan="2">รายการ</th>';
  htmlContent += '<th colspan="2">จำนวนเงิน (บาท)</th>';
  htmlContent += "</tr>";

  var senderCash = "";
  var witnessSenderCash = "";
  var sumSendCashData = 0;
  var listSendCashData1000 = [];
  var listSendCashData500 = [];
  var listSendCashData100 = [];
  var listSendCashData50 = [];
  var listSendCashData20 = [];
  sendCashData.map((obj) => {
    senderCash = obj.send_cash_1;
    witnessSenderCash = obj.send_cash_2;
    if (obj.cash_amt === "1000") {
      listSendCashData1000.push("1,000");
      listSendCashData1000.push(
        obj.branch_collect_cash_amount_deposit !== 0
          ? obj.branch_collect_cash_amount_deposit
          : "-"
      );
      listSendCashData1000.push(
        obj.branch_cash_amount_deposit !== 0
          ? helperService.numberFormat(
              parseFloat(obj.branch_cash_amount_deposit)
            )
          : "-"
      );
      sumSendCashData +=
        obj.branch_cash_amount_deposit !== 0
          ? parseFloat(obj.branch_cash_amount_deposit)
          : 0;
    }

    if (obj.cash_amt === "500") {
      listSendCashData500.push("500");
      listSendCashData500.push(
        obj.branch_collect_cash_amount_deposit !== 0
          ? obj.branch_collect_cash_amount_deposit
          : "-"
      );
      listSendCashData500.push(
        obj.branch_cash_amount_deposit !== 0
          ? helperService.numberFormat(
              parseFloat(obj.branch_cash_amount_deposit)
            )
          : "-"
      );
      sumSendCashData +=
        obj.branch_cash_amount_deposit !== 0
          ? parseFloat(obj.branch_cash_amount_deposit)
          : 0;
    }

    if (obj.cash_amt === "100") {
      listSendCashData100.push("100");
      listSendCashData100.push(
        obj.branch_collect_cash_amount_deposit !== 0
          ? obj.branch_collect_cash_amount_deposit
          : "-"
      );
      listSendCashData100.push(
        obj.branch_cash_amount_deposit !== 0
          ? helperService.numberFormat(
              parseFloat(obj.branch_cash_amount_deposit)
            )
          : "-"
      );
      sumSendCashData +=
        obj.branch_cash_amount_deposit !== 0
          ? parseFloat(obj.branch_cash_amount_deposit)
          : 0;
    }

    if (obj.cash_amt === "50") {
      listSendCashData50.push("50");
      listSendCashData50.push(
        obj.branch_collect_cash_amount_deposit !== 0
          ? obj.branch_collect_cash_amount_deposit
          : "-"
      );
      listSendCashData50.push(
        obj.branch_cash_amount_deposit !== 0
          ? helperService.numberFormat(
              parseFloat(obj.branch_cash_amount_deposit)
            )
          : "-"
      );
      sumSendCashData +=
        obj.branch_cash_amount_deposit !== 0
          ? parseFloat(obj.branch_cash_amount_deposit)
          : 0;
    }

    if (obj.cash_amt === "20") {
      listSendCashData20.push("20");
      listSendCashData20.push(
        obj.branch_collect_cash_amount_deposit !== 0
          ? obj.branch_collect_cash_amount_deposit
          : "-"
      );
      listSendCashData20.push(
        obj.branch_cash_amount_deposit !== 0
          ? helperService.numberFormat(
              parseFloat(obj.branch_cash_amount_deposit)
            )
          : "-"
      );
      sumSendCashData +=
        obj.branch_cash_amount_deposit !== 0
          ? parseFloat(obj.branch_cash_amount_deposit)
          : 0;
    }
  });

  if (listSendCashData1000[1]) {
    htmlContent += "<tr>";
    htmlContent +=
      '<td colspan="2" style="font-size: 18px;text-align: center;">ธนบัตรชนิดราคา ' +
      listSendCashData1000[0].toString() +
      " บาท x " +
      listSendCashData1000[1].toString() +
      " มัด</td>";
    htmlContent +=
      '<td colspan="2" style="font-size: 18px;text-align: right;">' +
      listSendCashData1000[2].toString() +
      " </td>";
    htmlContent += "</tr>";
  } else {
    htmlContent += "<tr>";
    htmlContent +=
      '<td colspan="2" style="font-size: 18px;text-align: center;">ธนบัตรชนิดราคา 1,000 บาท x - มัด</td>';
    htmlContent +=
      '<td colspan="2" style="font-size: 18px;text-align: right;"> - </td>';
    htmlContent += "</tr>";
  }

  if (listSendCashData500[1]) {
    htmlContent += "<tr>";
    htmlContent +=
      '<td colspan="2" style="font-size: 18px;text-align: center;">ธนบัตรชนิดราคา ' +
      listSendCashData500[0].toString() +
      " บาท x " +
      listSendCashData500[1].toString() +
      " มัด</td>";
    htmlContent +=
      '<td colspan="2" style="font-size: 18px;text-align: right;">' +
      listSendCashData500[2].toString() +
      " </td>";
    htmlContent += "</tr>";
  } else {
    htmlContent += "<tr>";
    htmlContent +=
      '<td colspan="2" style="font-size: 18px;text-align: center;">ธนบัตรชนิดราคา 500 บาท x - มัด</td>';
    htmlContent +=
      '<td colspan="2" style="font-size: 18px;text-align: right;"> - </td>';
    htmlContent += "</tr>";
  }

  if (listSendCashData100[1]) {
    htmlContent += "<tr>";
    htmlContent +=
      '<td colspan="2" style="font-size: 18px;text-align: center;">ธนบัตรชนิดราคา ' +
      listSendCashData100[0].toString() +
      " บาท x " +
      listSendCashData100[1].toString() +
      " มัด</td>";
    htmlContent +=
      '<td colspan="2" style="font-size: 18px;text-align: right;">' +
      listSendCashData100[2].toString() +
      " </td>";
    htmlContent += "</tr>";
  } else {
    htmlContent += "<tr>";
    htmlContent +=
      '<td colspan="2" style="font-size: 18px;text-align: center;">ธนบัตรชนิดราคา 100 บาท x - มัด</td>';
    htmlContent +=
      '<td colspan="2" style="font-size: 18px;text-align: right;"> - </td>';
    htmlContent += "</tr>";
  }

  if (listSendCashData50[1]) {
    htmlContent += "<tr>";
    htmlContent +=
      '<td colspan="2" style="font-size: 18px;text-align: center;">ธนบัตรชนิดราคา ' +
      listSendCashData50[0].toString() +
      " บาท x " +
      listSendCashData50[1].toString() +
      " มัด</td>";
    htmlContent +=
      '<td colspan="2" style="font-size: 18px;text-align: right;">' +
      listSendCashData50[2].toString() +
      " </td>";
    htmlContent += "</tr>";
  } else {
    htmlContent += "<tr>";
    htmlContent +=
      '<td colspan="2" style="font-size: 18px;text-align: center;">ธนบัตรชนิดราคา 50 บาท x - มัด</td>';
    htmlContent +=
      '<td colspan="2" style="font-size: 18px;text-align: right;"> - </td>';
    htmlContent += "</tr>";
  }

  if (listSendCashData20[1]) {
    htmlContent += "<tr>";
    htmlContent +=
      '<td colspan="2" style="font-size: 18px;text-align: center;">ธนบัตรชนิดราคา ' +
      listSendCashData20[0].toString() +
      " บาท x " +
      listSendCashData20[1].toString() +
      " มัด</td>";
    htmlContent +=
      '<td colspan="2" style="font-size: 18px;text-align: right;">' +
      listSendCashData20[2].toString() +
      " </td>";
    htmlContent += "</tr>";
  } else {
    htmlContent += "<tr>";
    htmlContent +=
      '<td colspan="2" style="font-size: 18px;text-align: center;">ธนบัตรชนิดราคา 20 บาท x - มัด</td>';
    htmlContent +=
      '<td colspan="2" style="font-size: 18px;text-align: right;"> - </td>';
    htmlContent += "</tr>";
  }

  htmlContent += "</table>";

  htmlContent += "<br />";

  htmlContent += "<table>";
  htmlContent += "<tr>";
  htmlContent +=
    '<td colspan="4" style="font-size: 22px;font-weight: bold;background-color: rgb(219, 219, 219);">(' +
    BAHTTEXT(sumSendCashData) +
    ")</td>";
  htmlContent += "</tr>";
  htmlContent += "<tr>";
  htmlContent +=
    '<td colspan="4" style="font-size: 20px;font-weight: normal;">ตัวอักษร</td>';
  htmlContent += "</tr>";
  htmlContent += "</table>";

  htmlContent += "<br />";
  htmlContent += "<br />";

  // Footer ใบนำส่งเงิน (อส.92)
  htmlContent += "<table>";
  htmlContent += "<tr>";
  htmlContent +=
    '<td colspan="2" style="font-size: 18px;font-weight: bold;text-align: center; border: none;">ได้ส่งเงินจำนวนข้างบนนี้ไว้ถูกต้องแล้ว</td>';
  htmlContent +=
    '<td colspan="2" style="font-size: 18px;font-weight: bold;text-align: center; border: none;">ได้ส่งเงินจำนวนข้างบนนี้ไว้ถูกต้องแล้ว</td>';
  htmlContent += "</tr>";
  htmlContent += "</table>";

  htmlContent += "<br/>";
  htmlContent += "<br/>";

  htmlContent += "<table>";
  htmlContent += "<tr>";
  htmlContent +=
    '<td colspan="2" style="font-size: 18px;text-align: center; border: none;">ลงชื่อ..........................................ผู้ส่งเงิน</td>';
  htmlContent +=
    '<td colspan="2" style="font-size: 18px;text-align: center; border: none;">ลงชื่อ..........................................ผู้ส่งเงิน</td>';
  htmlContent += "</tr>";
  htmlContent += "<tr>";
  if (senderCash) {
    htmlContent +=
      '<td colspan="2" style="font-size: 18px;text-align: center; border: none;">(' +
      senderCash +
      ")</td>";
  } else {
    htmlContent +=
      '<td colspan="2" style="font-size: 18px;text-align: center; border: none;">(..........................................)</td>';
  }

  htmlContent +=
    '<td colspan="2" style="font-size: 18px;text-align: center; border: none;">(..........................................)</td>';
  htmlContent += "</tr>";
  htmlContent += "<tr>";
  htmlContent +=
    '<td colspan="2" style="font-size: 18px;text-align: center; border: none;">ตำแหน่ง..............................................</td>';
  htmlContent +=
    '<td colspan="2" style="font-size: 18px;text-align: center; border: none;">ตำแหน่ง..............................................</td>';
  htmlContent += "</tr>";
  htmlContent += "</table>";

  htmlContent += "<br/>";
  htmlContent += "<br/>";

  htmlContent += "<table>";
  htmlContent += "<tr>";
  htmlContent +=
    '<td colspan="2" style="font-size: 18px;text-align: center; border: none;">ลงชื่อ..........................................พยาน</td>';
  htmlContent +=
    '<td colspan="2" style="font-size: 18px;text-align: center; border: none;">ลงชื่อ..........................................พยาน</td>';
  htmlContent += "</tr>";
  htmlContent += "<tr>";
  if (witnessSenderCash) {
    htmlContent +=
      '<td colspan="2" style="font-size: 18px;text-align: center; border: none;">(' +
      witnessSenderCash +
      ")</td>";
  } else {
    htmlContent +=
      '<td colspan="2" style="font-size: 18px;text-align: center; border: none;">(..........................................)</td>';
  }
  htmlContent +=
    '<td colspan="2" style="font-size: 18px;text-align: center; border: none;">(..........................................)</td>';
  htmlContent += "</tr>";
  htmlContent += "<tr>";
  htmlContent +=
    '<td colspan="2" style="font-size: 18px;text-align: center; border: none;">ตำแหน่ง..............................................</td>';
  htmlContent +=
    '<td colspan="2" style="font-size: 18px;text-align: center; border: none;">ตำแหน่ง..............................................</td>';
  htmlContent += "</tr>";
  htmlContent += "</table>";

  htmlContent += "<br />";
  htmlContent += "<br />";
  htmlContent += "<br />";
  htmlContent += "<br />";

  htmlContent += "<table>";
  htmlContent += "<tr>";
  htmlContent +=
    '<td colspan="4" style="font-size: 18px;font-weight: bold;text-align: right;border: none;">' +
    cashCenterName +
    "</td>";
  htmlContent += "</tr>";
  htmlContent += "<tr>";
  htmlContent +=
    '<td colspan="4" style="font-size: 18px;font-weight: bold;text-align: right;border: none;">หน่วยงานรับเงิน</td>';
  htmlContent += "</tr>";
  htmlContent += "</table>";

  //New Page
  htmlContent += '<div style="page-break-before:always">&nbsp;</div>';

  //************ ใบถอนเงิน ************
  //Title ใบถอนเงิน
  htmlContent += "<table>";
  htmlContent += "<tr>";
  htmlContent += '<td width="25%" style="border: none;"></td>';
  htmlContent +=
    '<td width="50%" style="border: none;"><img src="' +
    logo +
    '" width="100px" height="100px"></img></td>';
  htmlContent += '<td width="25%" style="border: none;"></td>';
  htmlContent +=
    '<td width="25%" style="border: none;vertical-align: bottom;"><font style="font-weight: bold;font-size: 2rem;">ใบ<u>ถอน</u>เงิน</font></td>';
  htmlContent += "</tr>";
  htmlContent += "<tr>";
  htmlContent +=
    '<td colspan="3" style="font-size: 24px;border: none;"><h4>' +
    unitName +
    "</h4></td>";
  htmlContent += '<td style="border: none;"></td>';
  htmlContent += "</tr>";
  htmlContent += "<tr>";
  htmlContent +=
    '<td colspan="2" style="font-size: 18px;border: none;text-align: left">ใบถอนเงิน เลขที่ ' +
    documentNo +
    "</td>";
  htmlContent +=
    '<td colspan="2" style="font-size: 18px;text-align: right;border: none;">วันที่ ' +
    documentDate +
    "</td>";
  htmlContent += "</tr>";
  htmlContent += "</table>";

  //Detail ใบถอนเงิน
  htmlContent += "<table>";
  htmlContent += "<tr>";
  htmlContent +=
    '<td colspan="2" style="font-size: 18px;text-align: left; border: none;">ข้าพเจ้าขอถอนเงินตามรายการ ต่อไปนี้</td>';
  htmlContent += "</tr>";
  htmlContent += "<tr>";
  htmlContent += "<th>ชนิดราคา</th>";
  htmlContent += "<th>ประเภท</th>";
  htmlContent += "<th>จำนวนมัด</th>";
  htmlContent += "<th>จำนวนเงิน (บาท)</th>";
  htmlContent += "</tr>";

  var receiverCash = "";
  var witnessReciverCash = "";
  var sumReceiveCashData = 0;
  var listReceiveCashData1000 = [];
  var listReceiveCashData500 = [];
  var listReceiveCashData100 = [];
  var listReceiveCashData50 = [];
  var listReceiveCashData20 = [];
  receiveCashData.map((obj) => {
    receiverCash = obj.receive_cash_1;
    witnessReciverCash = obj.receive_cash_2;

    if (obj.cash_amt === "1000") {
      if (obj.cash_type === "ดี") {
        listReceiveCashData1000.push("ดี");
        listReceiveCashData1000.push(
          obj.branch_collect_cash_amount_withdraw !== 0
            ? obj.branch_collect_cash_amount_withdraw
            : "-"
        );
        listReceiveCashData1000.push(
          obj.branch_cash_amount_withdraw !== 0
            ? helperService.numberFormat(
                parseFloat(obj.branch_cash_amount_withdraw)
              )
            : "-"
        );

        sumReceiveCashData += parseFloat(obj.branch_cash_amount_withdraw);
      } else {
        listReceiveCashData1000.push("ดี");
        listReceiveCashData1000.push("-");
        listReceiveCashData1000.push("-");
        sumReceiveCashData += 0;
      }
      if (obj.cash_type === "ใหม่") {
        listReceiveCashData1000.push("ใหม่");
        listReceiveCashData1000.push(
          obj.branch_collect_cash_amount_withdraw !== 0
            ? obj.branch_collect_cash_amount_withdraw
            : "-"
        );
        listReceiveCashData1000.push(
          obj.branch_cash_amount_withdraw !== 0
            ? helperService.numberFormat(
                parseFloat(obj.branch_cash_amount_withdraw)
              )
            : "-"
        );
        sumReceiveCashData += parseFloat(obj.branch_cash_amount_withdraw);
      } else {
        listReceiveCashData1000.push("ใหม่");
        listReceiveCashData1000.push("-");
        listReceiveCashData1000.push("-");
        sumReceiveCashData += 0;
      }
    }

    if (obj.cash_amt === "500") {
      if (obj.cash_type === "ดี") {
        listReceiveCashData500.push("ดี");
        listReceiveCashData500.push(
          obj.branch_collect_cash_amount_withdraw !== 0
            ? obj.branch_collect_cash_amount_withdraw
            : "-"
        );
        listReceiveCashData500.push(
          obj.branch_cash_amount_withdraw !== 0
            ? helperService.numberFormat(
                parseFloat(obj.branch_cash_amount_withdraw)
              )
            : "-"
        );
        sumReceiveCashData += parseFloat(obj.branch_cash_amount_withdraw);
      } else {
        listReceiveCashData500.push("ดี");
        listReceiveCashData500.push("-");
        listReceiveCashData500.push("-");
        sumReceiveCashData += 0;
      }
      if (obj.cash_type === "ใหม่") {
        listReceiveCashData500.push("ใหม่");
        listReceiveCashData500.push(
          obj.branch_collect_cash_amount_withdraw !== 0
            ? obj.branch_collect_cash_amount_withdraw
            : "-"
        );
        listReceiveCashData500.push(
          obj.branch_cash_amount_withdraw !== 0
            ? helperService.numberFormat(
                parseFloat(obj.branch_cash_amount_withdraw)
              )
            : "-"
        );
        sumReceiveCashData += parseFloat(obj.branch_cash_amount_withdraw);
      } else {
        listReceiveCashData500.push("ใหม่");
        listReceiveCashData500.push("-");
        listReceiveCashData500.push("-");
        sumReceiveCashData += 0;
      }
    }

    if (obj.cash_amt === "100") {
      if (obj.cash_type === "ดี") {
        listReceiveCashData100.push("ดี");
        listReceiveCashData100.push(
          obj.branch_collect_cash_amount_withdraw !== 0
            ? obj.branch_collect_cash_amount_withdraw
            : "-"
        );
        listReceiveCashData100.push(
          obj.branch_cash_amount_withdraw !== 0
            ? helperService.numberFormat(
                parseFloat(obj.branch_cash_amount_withdraw)
              )
            : "-"
        );
        sumReceiveCashData += parseFloat(obj.branch_cash_amount_withdraw);
      } else {
        listReceiveCashData100.push("ดี");
        listReceiveCashData100.push("-");
        listReceiveCashData100.push("-");
        sumReceiveCashData += 0;
      }
      if (obj.cash_type === "ใหม่") {
        listReceiveCashData100.push("ใหม่");
        listReceiveCashData100.push(
          obj.branch_collect_cash_amount_withdraw !== 0
            ? obj.branch_collect_cash_amount_withdraw
            : "-"
        );
        listReceiveCashData100.push(
          obj.branch_cash_amount_withdraw !== 0
            ? helperService.numberFormat(
                parseFloat(obj.branch_cash_amount_withdraw)
              )
            : "-"
        );
        sumReceiveCashData += parseFloat(obj.branch_cash_amount_withdraw);
      } else {
        listReceiveCashData100.push("ใหม่");
        listReceiveCashData100.push("-");
        listReceiveCashData100.push("-");
        sumReceiveCashData += 0;
      }
    }

    if (obj.cash_amt === "50") {
      if (obj.cash_type === "ดี") {
        listReceiveCashData50.push("ดี");
        listReceiveCashData50.push(
          obj.branch_collect_cash_amount_withdraw !== 0
            ? obj.branch_collect_cash_amount_withdraw
            : "-"
        );
        listReceiveCashData50.push(
          obj.branch_cash_amount_withdraw !== 0
            ? helperService.numberFormat(
                parseFloat(obj.branch_cash_amount_withdraw)
              )
            : "-"
        );
        sumReceiveCashData += parseFloat(obj.branch_cash_amount_withdraw);
      } else {
        listReceiveCashData50.push("ดี");
        listReceiveCashData50.push("-");
        listReceiveCashData50.push("-");
        sumReceiveCashData += 0;
      }
      if (obj.cash_type === "ใหม่") {
        listReceiveCashData50.push("ใหม่");
        listReceiveCashData50.push(
          obj.branch_collect_cash_amount_withdraw !== 0
            ? obj.branch_collect_cash_amount_withdraw
            : "-"
        );
        listReceiveCashData50.push(
          obj.branch_cash_amount_withdraw !== 0
            ? helperService.numberFormat(
                parseFloat(obj.branch_cash_amount_withdraw)
              )
            : "-"
        );
        sumReceiveCashData += parseFloat(obj.branch_cash_amount_withdraw);
      } else {
        listReceiveCashData50.push("ใหม่");
        listReceiveCashData50.push("-");
        listReceiveCashData50.push("-");
        sumReceiveCashData += 0;
      }
    }

    if (obj.cash_amt === "20") {
      if (obj.cash_type === "ดี") {
        listReceiveCashData20.push("ดี");
        listReceiveCashData20.push(
          obj.branch_collect_cash_amount_withdraw !== 0
            ? obj.branch_collect_cash_amount_withdraw
            : "-"
        );
        listReceiveCashData20.push(
          obj.branch_cash_amount_withdraw !== 0
            ? helperService.numberFormat(
                parseFloat(obj.branch_cash_amount_withdraw)
              )
            : "-"
        );
        sumReceiveCashData += parseFloat(obj.branch_cash_amount_withdraw);
      } else {
        listReceiveCashData20.push("ดี");
        listReceiveCashData20.push("-");
        listReceiveCashData20.push("-");
        sumReceiveCashData += 0;
      }
      if (obj.cash_type === "ใหม่") {
        listReceiveCashData20.push("ใหม่");
        listReceiveCashData20.push(
          obj.branch_collect_cash_amount_withdraw !== 0
            ? obj.branch_collect_cash_amount_withdraw
            : "-"
        );
        listReceiveCashData20.push(
          obj.branch_cash_amount_withdraw !== 0
            ? helperService.numberFormat(
                parseFloat(obj.branch_cash_amount_withdraw)
              )
            : "-"
        );
        sumReceiveCashData += parseFloat(obj.branch_cash_amount_withdraw);
      } else {
        listReceiveCashData20.push("ใหม่");
        listReceiveCashData20.push("-");
        listReceiveCashData20.push("-");
        sumReceiveCashData += 0;
      }
    }
  });

  if (listReceiveCashData1000[1]) {
    htmlContent += "<tr>";
    htmlContent +=
      '<td rowspan="2" style="font-size: 18px;text-align: center;">1,000 บาท</td>';
    htmlContent +=
      '<td style="font-size: 18px;text-align: center;">' +
      listReceiveCashData1000[0] +
      "</td>";
    htmlContent +=
      '<td style="font-size: 18px;text-align: right;">' +
      listReceiveCashData1000[1] +
      "</td>";
    htmlContent +=
      '<td style="font-size: 18px;text-align: right;">' +
      listReceiveCashData1000[2] +
      "</td>";
    htmlContent += "</tr>";
    htmlContent += "<tr>";
    htmlContent +=
      '<td style="font-size: 18px;text-align: center;">' +
      listReceiveCashData1000[3] +
      "</td>";
    htmlContent +=
      '<td style="font-size: 18px;text-align: right;">' +
      listReceiveCashData1000[4] +
      "</td>";
    htmlContent +=
      '<td style="font-size: 18px;text-align: right;">' +
      listReceiveCashData1000[5] +
      "</td>";
    htmlContent += "</tr>";
  } else {
    htmlContent += "<tr>";
    htmlContent +=
      '<td rowspan="2" style="font-size: 18px;text-align: center;">1,000 บาท</td>';
    htmlContent += '<td style="font-size: 18px;text-align: center;">ดี</td>';
    htmlContent += '<td style="font-size: 18px;text-align: right;">-</td>';
    htmlContent += '<td style="font-size: 18px;text-align: right;">-</td>';
    htmlContent += "</tr>";
    htmlContent += "<tr>";
    htmlContent += '<td style="font-size: 18px;text-align: center;">ใหม่</td>';
    htmlContent += '<td style="font-size: 18px;text-align: right;">-</td>';
    htmlContent += '<td style="font-size: 18px;text-align: right;">-</td>';
    htmlContent += "</tr>";
  }

  if (listReceiveCashData500[1]) {
    htmlContent += "<tr>";
    htmlContent +=
      '<td rowspan="2" style="font-size: 18px;text-align: center;">500 บาท</td>';
    htmlContent +=
      '<td style="font-size: 18px;text-align: center;">' +
      listReceiveCashData500[0] +
      "</td>";
    htmlContent +=
      '<td style="font-size: 18px;text-align: right;">' +
      listReceiveCashData500[1] +
      "</td>";
    htmlContent +=
      '<td style="font-size: 18px;text-align: right;">' +
      listReceiveCashData500[2] +
      "</td>";
    htmlContent += "</tr>";
    htmlContent += "<tr>";
    htmlContent +=
      '<td style="font-size: 18px;text-align: center;">' +
      listReceiveCashData500[3] +
      "</td>";
    htmlContent +=
      '<td style="font-size: 18px;text-align: right;">' +
      listReceiveCashData500[4] +
      "</td>";
    htmlContent +=
      '<td style="font-size: 18px;text-align: right;">' +
      listReceiveCashData500[5] +
      "</td>";
    htmlContent += "</tr>";
  } else {
    htmlContent += "<tr>";
    htmlContent +=
      '<td rowspan="2" style="font-size: 18px;text-align: center;">500 บาท</td>';
    htmlContent += '<td style="font-size: 18px;text-align: center;">ดี</td>';
    htmlContent += '<td style="font-size: 18px;text-align: right;">-</td>';
    htmlContent += '<td style="font-size: 18px;text-align: right;">-</td>';
    htmlContent += "</tr>";
    htmlContent += "<tr>";
    htmlContent += '<td style="font-size: 18px;text-align: center;">ใหม่</td>';
    htmlContent += '<td style="font-size: 18px;text-align: right;">-</td>';
    htmlContent += '<td style="font-size: 18px;text-align: right;">-</td>';
    htmlContent += "</tr>";
  }

  if (listReceiveCashData100[1]) {
    htmlContent += "<tr>";
    htmlContent +=
      '<td rowspan="2" style="font-size: 18px;text-align: center;">100 บาท</td>';
    htmlContent +=
      '<td style="font-size: 18px;text-align: center;">' +
      listReceiveCashData100[0] +
      "</td>";
    htmlContent +=
      '<td style="font-size: 18px;text-align: right;">' +
      listReceiveCashData100[1] +
      "</td>";
    htmlContent +=
      '<td style="font-size: 18px;text-align: right;">' +
      listReceiveCashData100[2] +
      "</td>";
    htmlContent += "</tr>";
    htmlContent += "<tr>";
    htmlContent +=
      '<td style="font-size: 18px;text-align: center;">' +
      listReceiveCashData100[3] +
      "</td>";
    htmlContent +=
      '<td style="font-size: 18px;text-align: right;">' +
      listReceiveCashData100[4] +
      "</td>";
    htmlContent +=
      '<td style="font-size: 18px;text-align: right;">' +
      listReceiveCashData100[5] +
      "</td>";
    htmlContent += "</tr>";
  } else {
    htmlContent += "<tr>";
    htmlContent +=
      '<td rowspan="2" style="font-size: 18px;text-align: center;">100 บาท</td>';
    htmlContent += '<td style="font-size: 18px;text-align: center;">ดี</td>';
    htmlContent += '<td style="font-size: 18px;text-align: right;">-</td>';
    htmlContent += '<td style="font-size: 18px;text-align: right;">-</td>';
    htmlContent += "</tr>";
    htmlContent += "<tr>";
    htmlContent += '<td style="font-size: 18px;text-align: center;">ใหม่</td>';
    htmlContent += '<td style="font-size: 18px;text-align: right;">-</td>';
    htmlContent += '<td style="font-size: 18px;text-align: right;">-</td>';
    htmlContent += "</tr>";
  }

  if (listReceiveCashData50[1]) {
    htmlContent += "<tr>";
    htmlContent +=
      '<td rowspan="2" style="font-size: 18px;text-align: center;">50 บาท</td>';
    htmlContent +=
      '<td style="font-size: 18px;text-align: center;">' +
      listReceiveCashData50[0] +
      "</td>";
    htmlContent +=
      '<td style="font-size: 18px;text-align: right;">' +
      listReceiveCashData50[1] +
      "</td>";
    htmlContent +=
      '<td style="font-size: 18px;text-align: right;">' +
      listReceiveCashData50[2] +
      "</td>";
    htmlContent += "</tr>";
    htmlContent += "<tr>";
    htmlContent +=
      '<td style="font-size: 18px;text-align: center;">' +
      listReceiveCashData50[3] +
      "</td>";
    htmlContent +=
      '<td style="font-size: 18px;text-align: right;">' +
      listReceiveCashData50[4] +
      "</td>";
    htmlContent +=
      '<td style="font-size: 18px;text-align: right;">' +
      listReceiveCashData50[5] +
      "</td>";
    htmlContent += "</tr>";
  } else {
    htmlContent += "<tr>";
    htmlContent +=
      '<td rowspan="2" style="font-size: 18px;text-align: center;">50 บาท</td>';
    htmlContent += '<td style="font-size: 18px;text-align: center;">ดี</td>';
    htmlContent += '<td style="font-size: 18px;text-align: right;">-</td>';
    htmlContent += '<td style="font-size: 18px;text-align: right;">-</td>';
    htmlContent += "</tr>";
    htmlContent += "<tr>";
    htmlContent += '<td style="font-size: 18px;text-align: center;">ใหม่</td>';
    htmlContent += '<td style="font-size: 18px;text-align: right;">-</td>';
    htmlContent += '<td style="font-size: 18px;text-align: right;">-</td>';
    htmlContent += "</tr>";
  }

  if (listReceiveCashData20[1]) {
    htmlContent += "<tr>";
    htmlContent +=
      '<td rowspan="2" style="font-size: 18px;text-align: center;">20 บาท</td>';
    htmlContent +=
      '<td style="font-size: 18px;text-align: center;">' +
      listReceiveCashData20[0] +
      "</td>";
    htmlContent +=
      '<td style="font-size: 18px;text-align: right;">' +
      listReceiveCashData20[1] +
      "</td>";
    htmlContent +=
      '<td style="font-size: 18px;text-align: right;">' +
      listReceiveCashData20[2] +
      "</td>";
    htmlContent += "</tr>";
    htmlContent += "<tr>";
    htmlContent +=
      '<td style="font-size: 18px;text-align: center;">' +
      listReceiveCashData20[3] +
      "</td>";
    htmlContent +=
      '<td style="font-size: 18px;text-align: right;">' +
      listReceiveCashData20[4] +
      "</td>";
    htmlContent +=
      '<td style="font-size: 18px;text-align: right;">' +
      listReceiveCashData20[5] +
      "</td>";
    htmlContent += "</tr>";
  } else {
    htmlContent += "<tr>";
    htmlContent +=
      '<td rowspan="2" style="font-size: 18px;text-align: center;">20 บาท</td>';
    htmlContent += '<td style="font-size: 18px;text-align: center;">ดี</td>';
    htmlContent += '<td style="font-size: 18px;text-align: right;">-</td>';
    htmlContent += '<td style="font-size: 18px;text-align: right;">-</td>';
    htmlContent += "</tr>";
    htmlContent += "<tr>";
    htmlContent += '<td style="font-size: 18px;text-align: center;">ใหม่</td>';
    htmlContent += '<td style="font-size: 18px;text-align: right;">-</td>';
    htmlContent += '<td style="font-size: 18px;text-align: right;">-</td>';
    htmlContent += "</tr>";
  }

  htmlContent += '<tr style="border-bottom-style: double;">';
  htmlContent +=
    '<td colspan="3" style="font-size: 18px;text-align: center;">รวม</td>';
  htmlContent +=
    '<td style="font-size: 18px;text-align: right;">' +
    helperService.numberFormat(sumReceiveCashData) +
    "</td>";
  htmlContent += "</tr>";
  htmlContent += "</table>";

  //Footer ใบถอนเงิน
  htmlContent += "<br/>";
  htmlContent += "<br/>";

  htmlContent += "<table>";
  htmlContent += "<tr>";
  htmlContent += '<td style="border: none;"></td>';
  htmlContent +=
    '<td colspan="3" style="font-size: 18px;text-align: center; border: none;font-weight: bold;">ได้รับเงินจำนวนข้างบนนี้ไว้ถูกต้องแล้ว</td>';
  htmlContent += "</tr>";
  htmlContent += "</table>";

  htmlContent += "<br/>";
  htmlContent += "<br/>";

  htmlContent += "<table>";
  htmlContent += "<tr>";
  htmlContent += '<td style="border: none;"></td>';
  htmlContent +=
    '<td colspan="3" style="font-size: 18px;text-align: center; border: none;">ลงชื่อ..........................................ผู้ส่งเงิน</td>';
  htmlContent += "</tr>";
  if (receiverCash) {
    htmlContent += "<tr>";
    htmlContent += '<td style="border: none;"></td>';
    htmlContent +=
      '<td colspan="3" style="font-size: 18px;text-align: center; border: none;">(' +
      receiverCash +
      ")</td>";
    htmlContent += "</tr>";
  } else {
    htmlContent += "<tr>";
    htmlContent += '<td style="border: none;"></td>';
    htmlContent +=
      '<td colspan="3" style="font-size: 18px;text-align: center; border: none;">(..........................................)</td>';
    htmlContent += "</tr>";
  }
  htmlContent += "<tr>";
  htmlContent += '<td style="border: none;"></td>';
  htmlContent +=
    '<td colspan="3" style="font-size: 18px;text-align: center; border: none;">ตำแหน่ง..............................................</td>';
  htmlContent += "</tr>";
  htmlContent += "</table>";

  htmlContent += "<br/>";
  htmlContent += "<br/>";

  htmlContent += "<table>";
  htmlContent += "<tr>";
  htmlContent += '<td style="border: none;"></td>';
  htmlContent +=
    '<td colspan="3" style="font-size: 18px;text-align: center; border: none;">ลงชื่อ..........................................พยาน</td>';
  htmlContent += "</tr>";
  if (witnessReciverCash) {
    htmlContent += "<tr>";
    htmlContent += '<td style="border: none;"></td>';
    htmlContent +=
      '<td colspan="3" style="font-size: 18px;text-align: center; border: none;">(' +
      witnessReciverCash +
      ")</td>";
    htmlContent += "</tr>";
  } else {
    htmlContent += "<tr>";
    htmlContent += '<td style="border: none;"></td>';
    htmlContent +=
      '<td colspan="3" style="font-size: 18px;text-align: center; border: none;">(..........................................)</td>';
    htmlContent += "</tr>";
  }
  htmlContent += "<tr>";
  htmlContent += '<td style="border: none;"></td>';
  htmlContent +=
    '<td colspan="3" style="font-size: 18px;text-align: center; border: none;">ตำแหน่ง..............................................</td>';
  htmlContent += "</tr>";
  htmlContent += "</table>";

  htmlContent += "</div>";
  htmlContent += "</body>";
  htmlContent += "</html>";

  // Options for PDF generation
  const options = {
    format: "A4", // Paper format. Can be 'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'
    orientation: "portrait", // 'portrait' or 'landscape'
    border: {
      top: "0.5in", // Top margin
      right: "0.5in", // Right margin
      bottom: "0.5in", // Bottom margin
      left: "0.5in", // Left margin
    },
  };

  sendPdf(filename, htmlPdf, htmlContent, options, res);
}

async function getRptCashRequestCashCenter(
  header,
  filename,
  cashCenterName,
  transType,
  data,
  res
) {
  var htmlContent = "<!DOCTYPE html>";
  htmlContent += "<html lang='th'>";
  htmlContent += "<head>";
  htmlContent += "<title>" + header + "</title>";
  htmlContent += "<style type='text/css'>" + cssStyle + "</style>"; // Set Css style
  htmlContent += "</head>";
  htmlContent += "<body>";
  htmlContent += "<div>";

  if (transType === "ฝาก" || transType === "ถอน") {
    htmlContent += "<table>";
    htmlContent += "<tr>";
    htmlContent +=
      '<td colspan="6" style="font-size: 28px;text-align: center;border: none;">ความต้องการ <u>' +
      transType +
      "</u> ธนบัตร</td>";
    htmlContent += "</tr>";
    htmlContent += "<tr>";
    htmlContent +=
      '<td colspan="6" style="font-size: 26px;text-align: center;border: none;">' +
      cashCenterName +
      "</td>";
    htmlContent += "</tr>";
    htmlContent += "</table>";

    htmlContent += "<br />";

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

    htmlContent += "<table>";

    htmlContent += "<tr>";
    htmlContent +=
      '<td style="font-size: 16px;text-align: left;border: none;"><b>เลขที่รายการ</b></td>';
    htmlContent +=
      '<td colspan= "2" style="font-size: 16px;text-align: left;border: none;">' +
      documentNo +
      "</td>";
    htmlContent +=
      '<td style="font-size: 16px;text-align: left;border: none;"><b>วันที่รับส่ง</b></td>';
    htmlContent +=
      '<td colspan= "2" style="font-size: 16px;text-align: left;border: none;">' +
      receiveDate +
      "</td>";
    htmlContent += "</tr>";

    htmlContent += "<tr>";
    htmlContent +=
      '<td style="font-size: 16px;text-align: left;border: none;"><b>ผู้ทำธุรกรรม</b></td>';
    htmlContent +=
      '<td colspan= "2" style="font-size: 16px;text-align: left;border: none;">' +
      userTransaction +
      "</td>";
    htmlContent +=
      '<td style="font-size: 16px;text-align: left;border: none;"><b>เวลาทำธุรกรรม</b></td>';
    htmlContent +=
      '<td colspan= "2" style="font-size: 16px;text-align: left;border: none;">' +
      timeTransaction +
      "</td>";
    htmlContent += "</tr>";

    htmlContent += "<tr>";
    htmlContent +=
      '<td style="font-size: 16px;text-align: left;border: none;"><b>ผู้บันทึก</b></td>';
    htmlContent +=
      '<td colspan= "2" style="font-size: 16px;text-align: left;border: none;">' +
      createBy +
      "</td>";
    htmlContent +=
      '<td style="font-size: 16px;text-align: left;border: none;"><b>ผู้อนุมัติ</b></td>';
    htmlContent +=
      '<td colspan= "2" style="font-size: 16px;text-align: left;border: none;">' +
      approveBy +
      "</td>";
    htmlContent += "</tr>";

    htmlContent += "<tr>";
    htmlContent +=
      '<td style="font-size: 16px;text-align: left;border: none;"></td>';
    htmlContent +=
      '<td colspan= "2" style="font-size: 16px;text-align: left;border: none;">' +
      createDateTime +
      "</td>";
    htmlContent +=
      '<td style="font-size: 16px;text-align: left;border: none;"></td>';
    htmlContent +=
      '<td colspan= "2" style="font-size: 16px;text-align: left;border: none;">' +
      approveDateTime +
      "</td>";
    htmlContent += "</tr>";

    htmlContent += "<tr>";
    htmlContent +=
      '<td style="font-size: 16px;text-align: left;border: none;"><b>หมายเหตุ</b></td>';
    htmlContent +=
      '<td colspan= "2" style="font-size: 16px;text-align: left;border: none;">' +
      !remark
        ? "-"
        : remark + "</td>";
    htmlContent += "</tr>";

    htmlContent += "</table>";

    htmlContent += "<br/>";

    htmlContent += "<table>";
    htmlContent += "<tr>";
    htmlContent +=
      '<th colspan="2" style="font-size: 16px;text-align: center;">ชนิดราคา</th>';
    htmlContent +=
      '<th style="font-size: 16px;text-align: center;">ประเภท</th>';
    htmlContent +=
      '<th style="font-size: 16px;text-align: center;">จำนวนฉบับ</th>';
    htmlContent +=
      '<th style="font-size: 16px;text-align: center;">จำนวนมัด</th>';
    htmlContent +=
      '<th style="font-size: 16px;text-align: center;">จำนวนเงิน</th>';
    htmlContent += "</tr>";

    if (detailList.length) {
      for (const item of detailList) {
        htmlContent += "<tr>";
        htmlContent +=
          '<td colspan="2" style="font-size: 16px;text-align: center;">' +
          item[0] +
          "</td>";
        htmlContent +=
          '<td style="font-size: 16px;text-align: center;">' +
          item[1] +
          "</td>";
        htmlContent +=
          '<td style="font-size: 16px;text-align: right;">' + item[2] + "</td>";
        htmlContent +=
          '<td style="font-size: 16px;text-align: right;">' + item[3] + "</td>";
        htmlContent +=
          '<td style="font-size: 16px;text-align: right;">' + item[4] + "</td>";
        htmlContent += "</tr>";
      }
    }

    htmlContent += '<tr style="border-bottom-style: double;">';
    htmlContent +=
      '<td colspan="4" style="font-size: 16px;text-align: center;">รวมจำนวนเงิน</td>';
    htmlContent +=
      '<td style="font-size: 16px;text-align: right;">' +
      helperService.numberFormat(sumCashCollect) +
      "</td>";
    htmlContent +=
      '<td style="font-size: 16px;text-align: right;">' +
      helperService.numberFormat(sumCashAmount) +
      "</td>";
    htmlContent += "</tr>";

    htmlContent += "</table>";
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
    htmlContent += "<table>";
    htmlContent += "<tr>";
    htmlContent +=
      '<td colspan="6" style="font-size: 28px;text-align: center;border: none;">ความต้องการ <u>ฝาก</u> ธนบัตร</td>';
    htmlContent += "</tr>";
    htmlContent += "<tr>";
    htmlContent +=
      '<td colspan="6" style="font-size: 26px;text-align: center;border: none;">' +
      cashCenterName +
      "</td>";
    htmlContent += "</tr>";
    htmlContent += "</table>";

    htmlContent += "<br />";

    htmlContent += "<table>";

    htmlContent += "<tr>";
    htmlContent +=
      '<td style="font-size: 16px;text-align: left;border: none;"><b>เลขที่รายการ</b></td>';
    htmlContent +=
      '<td colspan= "2" style="font-size: 16px;text-align: left;border: none;">' +
      documentNo +
      "</td>";
    htmlContent +=
      '<td style="font-size: 16px;text-align: left;border: none;"><b>วันที่รับส่ง</b></td>';
    htmlContent +=
      '<td colspan= "2" style="font-size: 16px;text-align: left;border: none;">' +
      receiveDate +
      "</td>";
    htmlContent += "</tr>";

    htmlContent += "<tr>";
    htmlContent +=
      '<td style="font-size: 16px;text-align: left;border: none;"><b>ผู้ทำธุรกรรม</b></td>';
    htmlContent +=
      '<td colspan= "2" style="font-size: 16px;text-align: left;border: none;">' +
      userTransaction +
      "</td>";
    htmlContent +=
      '<td style="font-size: 16px;text-align: left;border: none;"><b>เวลาทำธุรกรรม</b></td>';
    htmlContent +=
      '<td colspan= "2" style="font-size: 16px;text-align: left;border: none;">' +
      timeTransaction +
      "</td>";
    htmlContent += "</tr>";

    htmlContent += "<tr>";
    htmlContent +=
      '<td style="font-size: 16px;text-align: left;border: none;"><b>ผู้บันทึก</b></td>';
    htmlContent +=
      '<td colspan= "2" style="font-size: 16px;text-align: left;border: none;">' +
      createBy +
      "</td>";
    htmlContent +=
      '<td style="font-size: 16px;text-align: left;border: none;"><b>ผู้อนุมัติ</b></td>';
    htmlContent +=
      '<td colspan= "2" style="font-size: 16px;text-align: left;border: none;">' +
      approveBy +
      "</td>";
    htmlContent += "</tr>";

    htmlContent += "<tr>";
    htmlContent +=
      '<td style="font-size: 16px;text-align: left;border: none;"></td>';
    htmlContent +=
      '<td colspan= "2" style="font-size: 16px;text-align: left;border: none;">' +
      createDateTime +
      "</td>";
    htmlContent +=
      '<td style="font-size: 16px;text-align: left;border: none;"></td>';
    htmlContent +=
      '<td colspan= "2" style="font-size: 16px;text-align: left;border: none;">' +
      approveDateTime +
      "</td>";
    htmlContent += "</tr>";

    htmlContent += "<tr>";
    htmlContent +=
      '<td style="font-size: 16px;text-align: left;border: none;"><b>หมายเหตุ</b></td>';
    htmlContent +=
      '<td colspan= "2" style="font-size: 16px;text-align: left;border: none;">' +
      !remark
        ? "-"
        : remark + "</td>";
    htmlContent += "</tr>";

    htmlContent += "</table>";

    htmlContent += "<br/>";

    htmlContent += "<table>";
    htmlContent += "<tr>";
    htmlContent +=
      '<th colspan="2" style="font-size: 16px;text-align: center;">ชนิดราคา</th>';
    htmlContent +=
      '<th style="font-size: 16px;text-align: center;">ประเภท</th>';
    htmlContent +=
      '<th style="font-size: 16px;text-align: center;">จำนวนฉบับ</th>';
    htmlContent +=
      '<th style="font-size: 16px;text-align: center;">จำนวนมัด</th>';
    htmlContent +=
      '<th style="font-size: 16px;text-align: center;">จำนวนเงิน</th>';
    htmlContent += "</tr>";

    if (detailListDeposit.length) {
      for (const item of detailListDeposit) {
        htmlContent += "<tr>";
        htmlContent +=
          '<td colspan="2" style="font-size: 16px;text-align: center;">' +
          item[0] +
          "</td>";
        htmlContent +=
          '<td style="font-size: 16px;text-align: center;">' +
          item[1] +
          "</td>";
        htmlContent +=
          '<td style="font-size: 16px;text-align: right;">' + item[2] + "</td>";
        htmlContent +=
          '<td style="font-size: 16px;text-align: right;">' + item[3] + "</td>";
        htmlContent +=
          '<td style="font-size: 16px;text-align: right;">' + item[4] + "</td>";
        htmlContent += "</tr>";
      }
    }

    htmlContent += '<tr style="border-bottom-style: double;">';
    htmlContent +=
      '<td colspan="4" style="font-size: 16px;text-align: center;">รวมจำนวนเงิน</td>';
    htmlContent +=
      '<td style="font-size: 16px;text-align: right;">' +
      helperService.numberFormat(sumCashCollectDeposit) +
      "</td>";
    htmlContent +=
      '<td style="font-size: 16px;text-align: right;">' +
      helperService.numberFormat(sumCashAmountDeposit) +
      "</td>";
    htmlContent += "</tr>";

    htmlContent += "</table>";

    //New page
    htmlContent += '<div style="page-break-before:always">&nbsp;</div>';

    //ความต้องการถอน
    htmlContent += "<table>";
    htmlContent += "<tr>";
    htmlContent +=
      '<td colspan="6" style="font-size: 28px;text-align: center;border: none;">ความต้องการ <u>ถอน</u> ธนบัตร</td>';
    htmlContent += "</tr>";
    htmlContent += "<tr>";
    htmlContent +=
      '<td colspan="6" style="font-size: 26px;text-align: center;border: none;">' +
      cashCenterName +
      "</td>";
    htmlContent += "</tr>";
    htmlContent += "</table>";

    htmlContent += "<br />";

    htmlContent += "<table>";

    htmlContent += "<tr>";
    htmlContent +=
      '<td style="font-size: 16px;text-align: left;border: none;"><b>เลขที่รายการ</b></td>';
    htmlContent +=
      '<td colspan= "2" style="font-size: 16px;text-align: left;border: none;">' +
      documentNo +
      "</td>";
    htmlContent +=
      '<td style="font-size: 16px;text-align: left;border: none;"><b>วันที่รับส่ง</b></td>';
    htmlContent +=
      '<td colspan= "2" style="font-size: 16px;text-align: left;border: none;">' +
      receiveDate +
      "</td>";
    htmlContent += "</tr>";

    htmlContent += "<tr>";
    htmlContent +=
      '<td style="font-size: 16px;text-align: left;border: none;"><b>ผู้ทำธุรกรรม</b></td>';
    htmlContent +=
      '<td colspan= "2" style="font-size: 16px;text-align: left;border: none;">' +
      userTransaction +
      "</td>";
    htmlContent +=
      '<td style="font-size: 16px;text-align: left;border: none;"><b>เวลาทำธุรกรรม</b></td>';
    htmlContent +=
      '<td colspan= "2" style="font-size: 16px;text-align: left;border: none;">' +
      timeTransaction +
      "</td>";
    htmlContent += "</tr>";

    htmlContent += "<tr>";
    htmlContent +=
      '<td style="font-size: 16px;text-align: left;border: none;"><b>ผู้บันทึก</b></td>';
    htmlContent +=
      '<td colspan= "2" style="font-size: 16px;text-align: left;border: none;">' +
      createBy +
      "</td>";
    htmlContent +=
      '<td style="font-size: 16px;text-align: left;border: none;"><b>ผู้อนุมัติ</b></td>';
    htmlContent +=
      '<td colspan= "2" style="font-size: 16px;text-align: left;border: none;">' +
      approveBy +
      "</td>";
    htmlContent += "</tr>";

    htmlContent += "<tr>";
    htmlContent +=
      '<td style="font-size: 16px;text-align: left;border: none;"></td>';
    htmlContent +=
      '<td colspan= "2" style="font-size: 16px;text-align: left;border: none;">' +
      createDateTime +
      "</td>";
    htmlContent +=
      '<td style="font-size: 16px;text-align: left;border: none;"></td>';
    htmlContent +=
      '<td colspan= "2" style="font-size: 16px;text-align: left;border: none;">' +
      approveDateTime +
      "</td>";
    htmlContent += "</tr>";

    htmlContent += "<tr>";
    htmlContent +=
      '<td style="font-size: 16px;text-align: left;border: none;"><b>หมายเหตุ</b></td>';
    htmlContent +=
      '<td colspan= "2" style="font-size: 16px;text-align: left;border: none;">' +
      !remark
        ? "-"
        : remark + "</td>";
    htmlContent += "</tr>";

    htmlContent += "</table>";

    htmlContent += "<br/>";

    htmlContent += "<table>";
    htmlContent += "<tr>";
    htmlContent +=
      '<th colspan="2" style="font-size: 16px;text-align: center;">ชนิดราคา</th>';
    htmlContent +=
      '<th style="font-size: 16px;text-align: center;">ประเภท</th>';
    htmlContent +=
      '<th style="font-size: 16px;text-align: center;">จำนวนฉบับ</th>';
    htmlContent +=
      '<th style="font-size: 16px;text-align: center;">จำนวนมัด</th>';
    htmlContent +=
      '<th style="font-size: 16px;text-align: center;">จำนวนเงิน</th>';
    htmlContent += "</tr>";

    if (detailListWithdraw.length) {
      for (const item of detailListWithdraw) {
        htmlContent += "<tr>";
        htmlContent +=
          '<td colspan="2" style="font-size: 16px;text-align: center;">' +
          item[0] +
          "</td>";
        htmlContent +=
          '<td style="font-size: 16px;text-align: center;">' +
          item[1] +
          "</td>";
        htmlContent +=
          '<td style="font-size: 16px;text-align: right;">' + item[2] + "</td>";
        htmlContent +=
          '<td style="font-size: 16px;text-align: right;">' + item[3] + "</td>";
        htmlContent +=
          '<td style="font-size: 16px;text-align: right;">' + item[4] + "</td>";
        htmlContent += "</tr>";
      }
    }

    htmlContent += '<tr style="border-bottom-style: double;">';
    htmlContent +=
      '<td colspan="4" style="font-size: 16px;text-align: center;">รวมจำนวนเงิน</td>';
    htmlContent +=
      '<td style="font-size: 16px;text-align: right;">' +
      helperService.numberFormat(sumCashCollectWithdraw) +
      "</td>";
    htmlContent +=
      '<td style="font-size: 16px;text-align: right;">' +
      helperService.numberFormat(sumCashAmountWithdraw) +
      "</td>";
    htmlContent += "</tr>";

    htmlContent += "</table>";
  }

  htmlContent += "</div>";
  htmlContent += "</body>";
  htmlContent += "</html>";

  // Options for PDF generation
  const options = {
    format: "A4", // Paper format. Can be 'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'
    orientation: "portrait", // 'portrait' or 'landscape'
    border: {
      top: "0.5in", // Top margin
      right: "0.5in", // Right margin
      bottom: "0.5in", // Bottom margin
      left: "0.5in", // Left margin
    },
  };

  sendPdf(filename, htmlPdf, htmlContent, options, res);
}
