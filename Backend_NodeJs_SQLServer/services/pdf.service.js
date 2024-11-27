const PDFDocument = require("pdfkit");
const PDFDocumentTable = require("pdfkit-table");
const th = require("date-fns/locale/th");
const { format, addYears } = require("date-fns");
const helperService = require("./helper.service");

const defaultOptions = {
  bufferPages: true,
  size: "A4",
};
newPage = (docs) => {
  docs.addPage(defaultOptions);
};

const bold = "fonts/THSarabun Bold.ttf";
const regular = "fonts/THSarabun.ttf";
const seguisym = "fonts/seguisym.ttf";

module.exports = {
  genRptUserSystem,
  getRptCashRequestSummary,
  getRptBranchCashFailedSummary,
  getRptCenterCashFailedSummary,
  getRptCashDiff,
  getRptCashFake
};

function genRptUserSystem(header, unitName, filename, data, res) {
  let docs = new PDFDocumentTable({
    bufferPages: true,
    size: "A4",
  });

  let buffers = [];
  docs.on("data", buffers.push.bind(buffers));
  docs.on("pageAdding", (e) => {
    e.options = defaultOptions;
  });

  docs.on("end", () => {
    let pdfData = Buffer.concat(buffers);
    res
      .writeHead(200, {
        "Content-Length": Buffer.byteLength(pdfData),
        "Content-Type": "application/pdf",
        "Content-disposition": `attachment;filename=${filename}-${format(
          addYears(new Date(), 543),
          "yyyyMMdd"
        )}.pdf`,
      })
      .end(pdfData);
  });

  docs
    .fontSize(18)
    .font(bold)
    .text(`${header}`, {
      align: "center",
    })
    .moveDown(0.5);
  docs.fontSize(14).font(bold).text(`${unitName}`, {
    align: "center",
  });

  const rows = [];
  let no = 1;
  data.forEach(({ name, roleName }) => {
    rows.push([no.toString()].concat(name, "", roleName));
    no += 1;
  });

  const table = {
    headers: [
      { label: "ลำดับ", align: "center", width: 50 },
      { label: "ชื่อ-สกุล", align: "center", width: 150 },
      { label: "ตำแหน่ง", align: "center", width: 150 },
      { label: "สิทธิการใช้งาน", align: "center", width: 150 },
    ],
    rows: rows,
  };

  const options = {
    prepareHeader: () => docs.font(regular).fontSize(16),
    prepareRow: () => docs.font(regular).fontSize(16),
  };

  docs.table(table, options);

  docs.end();
}

async function getRptCashRequestSummary(header, unitName, filename, data, res) {
  let docs = new PDFDocumentTable({
    bufferPages: true,
    size: "A3",
    layout: "landscape",
  });

  let buffers = [];
  docs.on("data", buffers.push.bind(buffers));
  docs.on("pageAdding", (e) => {
    e.options = defaultOptions;
  });

  docs.on("end", () => {
    let pdfData = Buffer.concat(buffers);
    res
      .writeHead(200, {
        "Content-Length": Buffer.byteLength(pdfData),
        "Content-Type": "application/pdf",
        "Content-disposition": `attachment;filename=${filename}-${format(
          addYears(new Date(), 543),
          "yyyyMMdd"
        )}.pdf`,
      })
      .end(pdfData);
  });

  docs
    .fontSize(18)
    .font(bold)
    .text(`${header}`, {
      align: "center",
    })
    .moveDown(0.5);
  docs
    .fontSize(14)
    .font(bold)
    .text(`${unitName}`, {
      align: "center",
    })
    .moveDown(2);

  const rows = [];
  data.map((obj) => {
    let dateTh =
      obj.document_date.substring(6, 8) +
      " " +
      helperService.covertMonthThai1(
        parseInt(obj.document_date.substring(4, 6))
      ) +
      " " +
      helperService.convertYearTh(obj.document_date.substring(0, 4));
    rows.push(
      [dateTh].concat(
        obj.document_no,
        obj.trans_type,
        obj.trans_type === "ถอน" ? obj.cash_type : "",
        !obj.cash_amt_1000 ? "-" :  helperService.numberFormat(parseFloat(obj.cash_amt_1000)),
        !obj.cash_amt_500 ? "-" :  helperService.numberFormat(parseFloat(obj.cash_amt_500)),
        !obj.cash_amt_100 ? "-" :  helperService.numberFormat(parseFloat(obj.cash_amt_100)),
        !obj.cash_amt_50 ? "-" :  helperService.numberFormat(parseFloat(obj.cash_amt_50)),
        !obj.cash_amt_20 ? "-" :  helperService.numberFormat(parseFloat(obj.cash_amt_20)),
        !obj.cash_amount ? "-" : helperService.numberFormat(parseFloat(obj.cash_amount)),
        !obj.document_remark ? "ไม่มี" : obj.document_remark
      )
    );
  });

  const table = {
    headers: [
      {
        label: "วันที่",
        rowSpan: 3,
        align: "center",
        width: 100,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "เลขที่เอกสาร",
        rowSpan: 3,
        align: "center",
        width: 100,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "ความต้องการ",
        align: "center",
        width: 100,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "ประเภท",
        align: "center",
        width: 60,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "1,000",
        align: "center",
        width: 60,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "500",
        align: "center",
        width: 60,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "100",
        align: "center",
        width: 60,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "50",
        align: "center",
        width: 60,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "20",
        align: "center",
        width: 60,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "จำนวนเงินรวม (บาท)",
        align: "center",
        width: 100,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "หมายเหตุ",
        align: "center",
        width: 200,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
    ],
    rows: rows,
    border: true,
  };

  const options = {
    prepareHeader: () => docs.font(regular).fontSize(16),
    prepareRow: () => docs.font(regular).fontSize(16),
    width: 800, // {Number} default: undefined // A4 595.28 x 841.89 (portrait) (about width sizes)
    x: 0, // {Number} default: undefined | To reset x position set "x: null"
    y: 0, // {Number} default: undefined |
    divider: {
      header: { disabled: false, width: 2, opacity: 1 },
      horizontal: { disabled: false, width: 0.5, opacity: 0.5 },
    },
    padding: 5, // {Number} default: 0
    columnSpacing: 5, // {Number} default: 5
    hideHeader: false,
    minRowHeight: 0,
  };

  docs.table(table, options);

  docs.end();
}

async function getRptBranchCashFailedSummary(
  header,
  unitName,
  filename,
  data,
  res
) {
  let docs = new PDFDocumentTable({
    bufferPages: true,
    size: "A4",
    layout: "landscape",
  });

  let buffers = [];
  docs.on("data", buffers.push.bind(buffers));
  docs.on("pageAdding", (e) => {
    e.options = defaultOptions;
  });

  docs.on("end", () => {
    let pdfData = Buffer.concat(buffers);
    res
      .writeHead(200, {
        "Content-Length": Buffer.byteLength(pdfData),
        "Content-Type": "application/pdf",
        "Content-disposition": `attachment;filename=${filename}-${format(
          addYears(new Date(), 543),
          "yyyyMMdd"
        )}.pdf`,
      })
      .end(pdfData);
  });

  docs
    .fontSize(18)
    .font(bold)
    .text(`${header}`, {
      align: "center",
    })
    .moveDown(0.5);
  docs
    .fontSize(14)
    .font(bold)
    .text(`${unitName}`, {
      align: "center",
    })
    .moveDown(2);

  const rows = [];
  data.map((obj) => {
    let dateTh =
      obj.document_date.substring(6, 8) +
      " " +
      helperService.covertMonthThai1(
        parseInt(obj.document_date.substring(4, 6))
      ) +
      " " +
      helperService.convertYearTh(obj.document_date.substring(0, 4));
    rows.push(
      [dateTh].concat(
        obj.cash_people_amount,
        obj.cash_type,
        !obj.cash_amt_1000 ? "-" : helperService.numberFormat(parseFloat(obj.cash_amt_1000)),
        !obj.cash_amt_500 ? "-" : helperService.numberFormat(parseFloat(obj.cash_amt_500)),
        !obj.cash_amt_100 ? "-" : helperService.numberFormat(parseFloat(obj.cash_amt_100)),
        !obj.cash_amt_50 ? "-" : helperService.numberFormat(parseFloat(obj.cash_amt_50)),
        !obj.cash_amt_20 ? "-" : helperService.numberFormat(parseFloat(obj.cash_amt_20)),
        !obj.cash_amt_อื่นๆ ? "-" : helperService.numberFormat(parseFloat(obj.cash_amt_อื่นๆ)),
        !obj.cash_amount ? "-" : helperService.numberFormat(parseFloat(obj.cash_amount))
      )
    );
  });

  const table = {
    headers: [
      {
        label: "วันที่",
        rowSpan: 3,
        align: "center",
        width: 100,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "จำนวนราย",
        align: "center",
        width: 60,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "ความต้องการ",
        align: "center",
        width: 100,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "1,000",
        align: "center",
        width: 60,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "500",
        align: "center",
        width: 60,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "100",
        align: "center",
        width: 60,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "50",
        align: "center",
        width: 60,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "20",
        align: "center",
        width: 60,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "อื่นๆ",
        align: "center",
        width: 60,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "รวม",
        align: "center",
        width: 100,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
    ],
    rows: rows,
    border: true,
  };

  const options = {
    prepareHeader: () => docs.font(regular).fontSize(16),
    prepareRow: () => docs.font(regular).fontSize(16),
    width: 800, // {Number} default: undefined // A4 595.28 x 841.89 (portrait) (about width sizes)
    x: 0, // {Number} default: undefined | To reset x position set "x: null"
    y: 0, // {Number} default: undefined |
    divider: {
      header: { disabled: false, width: 2, opacity: 1 },
      horizontal: { disabled: false, width: 0.5, opacity: 0.5 },
    },
    padding: 5, // {Number} default: 0
    columnSpacing: 5, // {Number} default: 5
    hideHeader: false,
    minRowHeight: 0,
  };

  docs.table(table, options);

  docs.end();
}

async function getRptCenterCashFailedSummary(
  header,
  subheader,
  filename,
  data,
  res
) {
  let docs = new PDFDocumentTable({
    bufferPages: true,
    size: "A3",
    layout: "landscape",
  });

  let buffers = [];
  docs.on("data", buffers.push.bind(buffers));
  docs.on("pageAdding", (e) => {
    e.options = defaultOptions;
  });

  docs.on("end", () => {
    let pdfData = Buffer.concat(buffers);
    res
      .writeHead(200, {
        "Content-Length": Buffer.byteLength(pdfData),
        "Content-Type": "application/pdf",
        "Content-disposition": `attachment;filename=${filename}-${format(
          addYears(new Date(), 543),
          "yyyyMMdd"
        )}.pdf`,
      })
      .end(pdfData);
  });

  docs
    .fontSize(18)
    .font(bold)
    .text(`${header}`, {
      align: "center",
    })
    .moveDown(0.5);
  docs
    .fontSize(14)
    .font(bold)
    .text(`${subheader}`, {
      align: "center",
    })
    .moveDown(2);

  const rows = [];
  data.map((obj) => {
    let dateTh =
      obj.document_date.substring(6, 8) +
      " " +
      helperService.covertMonthThai1(
        parseInt(obj.document_date.substring(4, 6))
      ) +
      " " +
      helperService.convertYearTh(obj.document_date.substring(0, 4));

    let sum_amount =
      (!obj.cash_amt_1000 ? 0.0 : parseFloat(obj.cash_amt_1000)) +
      (!obj.cash_amt_500 ? 0.0 : parseFloat(obj.cash_amt_500)) +
      (!obj.cash_amt_100 ? 0.0 : parseFloat(obj.cash_amt_100)) +
      (!obj.cash_amt_50 ? 0.0 : parseFloat(obj.cash_amt_50)) +
      (!obj.cash_amt_20 ? 0.0 : parseFloat(obj.cash_amt_20)) +
      (!obj.cash_amt_อื่นๆ ? 0.0 : parseFloat(obj.cash_amt_อื่นๆ));
    rows.push(
      [dateTh].concat(
        obj.cost_center,
        obj.branch_name,
        obj.cash_center_name,
        obj.cash_type,
        !obj.cash_people_amount ? "-" : helperService.numberFormat(parseFloat(obj.cash_people_amount)),
        !obj.cash_amt_1000 ? "-" : helperService.numberFormat(parseFloat(obj.cash_amt_1000)),
        !obj.cash_amt_500 ? "-" : helperService.numberFormat(parseFloat(obj.cash_amt_500)),
        !obj.cash_amt_100 ? "-" : helperService.numberFormat(parseFloat(obj.cash_amt_100)),
        !obj.cash_amt_50 ? "-" : helperService.numberFormat(parseFloat(obj.cash_amt_50)),
        !obj.cash_amt_20 ? "-" : helperService.numberFormat(parseFloat(obj.cash_amt_20)),
        !obj.cash_amt_อื่นๆ ? "-" : helperService.numberFormat(parseFloat(obj.cash_amt_อื่นๆ)),
        !sum_amount ? "-" : helperService.numberFormat(sum_amount)
      )
    );
  });

  const table = {
    headers: [
      {
        label: "วันที่",
        rowSpan: 3,
        align: "center",
        width: 100,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "รหัสศูนย์ต้นทุน",
        align: "center",
        width: 80,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "สาขา",
        align: "center",
        width: 100,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "ศูนย์เงินสด",
        align: "center",
        width: 100,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "ความต้องการ",
        align: "center",
        width: 100,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "จำนวนราย",
        align: "center",
        width: 100,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "1,000",
        align: "center",
        width: 60,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "500",
        align: "center",
        width: 60,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "100",
        align: "center",
        width: 60,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "50",
        align: "center",
        width: 60,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "20",
        align: "center",
        width: 60,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "อื่นๆ",
        align: "center",
        width: 60,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "รวม",
        align: "center",
        width: 100,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
    ],
    rows: rows,
    border: true,
  };

  const options = {
    prepareHeader: () => docs.font(regular).fontSize(16),
    prepareRow: () => docs.font(regular).fontSize(16),
    width: 800, // {Number} default: undefined // A4 595.28 x 841.89 (portrait) (about width sizes)
    x: 0, // {Number} default: undefined | To reset x position set "x: null"
    y: 0, // {Number} default: undefined |
    divider: {
      header: { disabled: false, width: 2, opacity: 1 },
      horizontal: { disabled: false, width: 0.5, opacity: 0.5 },
    },
    padding: 5, // {Number} default: 0
    columnSpacing: 5, // {Number} default: 5
    hideHeader: false,
    minRowHeight: 0,
  };

  docs.table(table, options);

  docs.end();
}

async function getRptCashDiff(header, subheader, filename, data, res) {
  let docs = new PDFDocumentTable({
    bufferPages: true,
    size: "A4",
    layout: "landscape",
  });

  let buffers = [];
  docs.on("data", buffers.push.bind(buffers));
  docs.on("pageAdding", (e) => {
    e.options = defaultOptions;
  });

  docs.on("end", () => {
    let pdfData = Buffer.concat(buffers);
    res
      .writeHead(200, {
        "Content-Length": Buffer.byteLength(pdfData),
        "Content-Type": "application/pdf",
        "Content-disposition": `attachment;filename=${filename}-${format(
          addYears(new Date(), 543),
          "yyyyMMdd"
        )}.pdf`,
      })
      .end(pdfData);
  });

  docs
    .fontSize(18)
    .font(bold)
    .text(`${header}`, {
      align: "center",
    })
    .moveDown(0.5);
  docs
    .fontSize(14)
    .font(bold)
    .text(`${subheader}`, {
      align: "center",
    })
    .moveDown(2);

  const rows = [];
  data.map((obj) => {
    let dateTh =
      obj.document_date.substring(6, 8) +
      " " +
      helperService.covertMonthThai1(
        parseInt(obj.document_date.substring(4, 6))
      ) +
      " " +
      helperService.convertYearTh(obj.document_date.substring(0, 4));

    rows.push(
      [dateTh].concat(
        obj.cash_price,
        !obj.cash_type_ขาด ? "-" : helperService.numberFormat(parseFloat(obj.cash_type_ขาด)),
        !obj.cash_type_ปลอม ? "-" : helperService.numberFormat(parseFloat(obj.cash_type_ปลอม)),
        !obj.cash_type_ชำรุด ? "-" : helperService.numberFormat(parseFloat(obj.cash_type_ชำรุด)),
        !obj.cash_type_เกิน ? "-" : helperService.numberFormat(parseFloat(obj.cash_type_เกิน)),
        !obj.cash_type_สาขาชดใช้ ? "-" : helperService.numberFormat(parseFloat(obj.cash_type_สาขาชดใช้)),
        !obj.cash_type_ศูนย์ส่งคืน ? "-" : helperService.numberFormat(parseFloat(obj.cash_type_ศูนย์ส่งคืน))
      )
    );
  });

  const table = {
    headers: [
      {
        label: "วันที่",
        rowSpan: 3,
        align: "center",
        width: 100,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "ชนิดราคา",
        align: "center",
        width: 60,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "ขาด",
        align: "center",
        width: 60,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "ปลอม",
        align: "center",
        width: 60,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "ชำรุด",
        align: "center",
        width: 60,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "เกิน",
        align: "center",
        width: 60,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "สาขาชดใช้",
        align: "center",
        width: 60,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "ศูนย์ส่งคืน",
        align: "center",
        width: 60,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      }
    ],
    rows: rows,
    border: true,
  };

  const options = {
    prepareHeader: () => docs.font(regular).fontSize(16),
    prepareRow: () => docs.font(regular).fontSize(16),
    width: 800, // {Number} default: undefined // A4 595.28 x 841.89 (portrait) (about width sizes)
    x: 0, // {Number} default: undefined | To reset x position set "x: null"
    y: 0, // {Number} default: undefined |
    divider: {
      header: { disabled: false, width: 2, opacity: 1 },
      horizontal: { disabled: false, width: 0.5, opacity: 0.5 },
    },
    padding: 5, // {Number} default: 0
    columnSpacing: 5, // {Number} default: 5
    hideHeader: false,
    minRowHeight: 0,
  };

  docs.table(table, options);

  docs.end();
}

async function getRptCashFake(header, subheader, filename, data, res){
  let docs = new PDFDocumentTable({
    bufferPages: true,
    size: "A3",
    layout: "landscape",
  });

  let buffers = [];
  docs.on("data", buffers.push.bind(buffers));
  docs.on("pageAdding", (e) => {
    e.options = defaultOptions;
  });

  docs.on("end", () => {
    let pdfData = Buffer.concat(buffers);
    res
      .writeHead(200, {
        "Content-Length": Buffer.byteLength(pdfData),
        "Content-Type": "application/pdf",
        "Content-disposition": `attachment;filename=${filename}-${format(
          addYears(new Date(), 543),
          "yyyyMMdd"
        )}.pdf`,
      })
      .end(pdfData);
  });

  docs
    .fontSize(18)
    .font(bold)
    .text(`${header}`, {
      align: "center",
    })
    .moveDown(0.5);
  docs
    .fontSize(14)
    .font(bold)
    .text(`${subheader}`, {
      align: "center",
    })
    .moveDown(2);

  const rows = [];
  data.map((obj) => {
    let dateTh =
      obj.document_date.substring(6, 8) +
      " " +
      helperService.covertMonthThai1(
        parseInt(obj.document_date.substring(4, 6))
      ) +
      " " +
      helperService.convertYearTh(obj.document_date.substring(0, 4));

    let sum_amount =
      (!obj.cash_amt_1000 ? 0.0 : parseFloat(obj.cash_amt_1000)) +
      (!obj.cash_amt_500 ? 0.0 : parseFloat(obj.cash_amt_500)) +
      (!obj.cash_amt_100 ? 0.0 : parseFloat(obj.cash_amt_100)) +
      (!obj.cash_amt_50 ? 0.0 : parseFloat(obj.cash_amt_50)) +
      (!obj.cash_amt_20 ? 0.0 : parseFloat(obj.cash_amt_20)) +
      (!obj.cash_amt_อื่นๆ ? 0.0 : parseFloat(obj.cash_amt_อื่นๆ));

    rows.push(
      [dateTh].concat(
        obj.cost_center,
        obj.branch_name,
        obj.cash_center_name,
        !obj.cash_amt_1000 ? "-" : helperService.numberFormat(parseFloat(obj.cash_amt_1000)),
        !obj.cash_amt_500 ? "-" : helperService.numberFormat(parseFloat(obj.cash_amt_500)),
        !obj.cash_amt_100 ? "-" : helperService.numberFormat(parseFloat(obj.cash_amt_100)),
        !obj.cash_amt_50 ? "-" : helperService.numberFormat(parseFloat(obj.cash_amt_50)),
        !obj.cash_amt_20 ? "-" : helperService.numberFormat(parseFloat(obj.cash_amt_20)),
        !obj.cash_amt_อื่นๆ ? "-" : helperService.numberFormat(parseFloat(obj.cash_amt_อื่นๆ)),
        !sum_amount ? "-" : helperService.numberFormat(sum_amount)
      )
    );
  });

  const table = {
    headers: [
      {
        label: "วันที่",
        rowSpan: 3,
        align: "center",
        width: 100,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "รหัสศูนย์ต้นทุน",
        align: "center",
        width: 60,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "สาขา",
        rowSpan: 3,
        align: "center",
        width: 100,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "ศูนย์เงินสด",
        rowSpan: 3,
        align: "center",
        width: 100,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "1,000",
        align: "center",
        width: 60,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "500",
        align: "center",
        width: 60,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "100",
        align: "center",
        width: 60,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "50",
        align: "center",
        width: 60,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "20",
        align: "center",
        width: 60,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "อื่นๆ",
        align: "center",
        width: 60,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      },
      {
        label: "รวม",
        align: "center",
        width: 60,
        headerColor: "#ADD8E6",
        headerOpacity: 0.5,
      }
    ],
    rows: rows,
    border: true,
  };

  const options = {
    prepareHeader: () => docs.font(regular).fontSize(16),
    prepareRow: () => docs.font(regular).fontSize(16),
    width: 800, // {Number} default: undefined // A4 595.28 x 841.89 (portrait) (about width sizes)
    x: 0, // {Number} default: undefined | To reset x position set "x: null"
    y: 0, // {Number} default: undefined |
    divider: {
      header: { disabled: false, width: 2, opacity: 1 },
      horizontal: { disabled: false, width: 0.5, opacity: 0.5 },
    },
    padding: 5, // {Number} default: 0
    columnSpacing: 5, // {Number} default: 5
    hideHeader: false,
    minRowHeight: 0,
  };

  docs.table(table, options);

  docs.end();
}


