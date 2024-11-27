const reportRepo = require("../repositorys/report.repository");
const helperService = require("./helper.service");
const pdfService = require("./pdf.service");
const excelService = require("./excel.service");
const htmlPdfService = require("./htmlPdf.service");

function ReportService() {
  async function rptCashRequestByDocno(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (!req.body.documentNo) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let params = {
      documentNo: req.body.documentNo,
    };
    let result = await reportRepo.rptCashRequestByDocno(params);
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error(result.message);
      return res
        .status(200)
        .json(helperService.responseResult("error", result.message, 0, []));
    }
  }

  async function rptCashRequestCashCenter(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (
      !req.body.createDate ||
      !req.body.transType ||
      !req.body.cashCenter ||
      !req.body.cashCenterName
    ) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let params = {
      createDate: req.body.createDate,
      transType: req.body.transType,
      cashCenter: req.body.cashCenter,
    };
    let result = await reportRepo.rptCashRequestCashCenter(params);
    if (result.status === "success") {
      //Export Report
      if (req.body.docType === "pdf") {
        htmlPdfService.getRptCashRequestCashCenter(
          "รายงานความต้องการฝากถอนธนบัตรของศูนย์เงินสด",
          "masp-cash_รายงานความต้องการฝากถอนธนบัตรของศูนย์เงินสด",
          req.body.cashCenterName,
          req.body.transType,
          result.data,
          res
        );
      } else if (req.body.docType === "excel") {
        excelService.getRptCashRequestCashCenter(
          "รายงานความต้องการฝากถอนธนบัตรของศูนย์เงินสด",
          "masp-cash_รายงานความต้องการฝากถอนธนบัตรของศูนย์เงินสด",
          req.body.cashCenterName,
          req.body.transType,
          result.data,
          res
        )
      } else {
        return res
          .status(200)
          .json(
            helperService.responseResult(
              "กรุณาระบุรูปแบบเอกสาร",
              result.message,
              0,
              []
            )
          );
      }
    } else {
      console.error(result.message);
      return res
        .status(200)
        .json(helperService.responseResult("error", result.message, 0, []));
    }
  }
  async function rptSendCashConfirmByDocno(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (!req.body.documentNo) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let params = {
      documentNo: req.body.documentNo,
    };
    let result = await reportRepo.rptSendCashConfirmByDocno(params);
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error(result.message);
      return res
        .status(200)
        .json(helperService.responseResult("error", result.message, 0, []));
    }
  }

  async function rptReceiveCashConfirmByDocno(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (!req.body.documentNo) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let params = {
      documentNo: req.body.documentNo,
    };
    let result = await reportRepo.rptReceiveCashConfirmByDocno(params);
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error(result.message);
      return res
        .status(200)
        .json(helperService.responseResult("error", result.message, 0, []));
    }
  }

  async function rptSendCashConfirmByFillter(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (!req.body.recDate) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let params = {
      recDate: req.body.recDate,
      unitId: req.body.unitId,
    };
    let result = await reportRepo.rptSendCashConfirmByFillter(params);
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error(result.message);
      return res
        .status(200)
        .json(helperService.responseResult("error", result.message, 0, []));
    }
  }

  async function rptReceiveCashConfirmByFillter(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (!req.body.recDate) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let params = {
      recDate: req.body.recDate,
      unitId: req.body.unitId,
    };
    let result = await reportRepo.rptReceiveCashConfirmByFillter(params);
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error(result.message);
      return res
        .status(200)
        .json(helperService.responseResult("error", result.message, 0, []));
    }
  }

  async function rptCashRequestSummary(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (
      !req.body.startDate ||
      !req.body.endDate ||
      !req.body.unitId ||
      !req.body.unitName
    ) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let params = {
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      unitId: req.body.unitId,
    };
    let result = await reportRepo.rptCashRequestSummary(params);
    if (result.status === "success") {
      htmlPdfService.getRptCashRequestSummary(
        "รายงานสรุปการฝากถอนธนบัตร",
        req.body.unitName,
        "masp-cash_รายงานสรุปการฝากถอนธนบัตร",
        result.data,
        res
      );
    } else {
      console.error(result.message);
      return res
        .status(200)
        .json(helperService.responseResult("error", result.message, 0, []));
    }
  }

  async function rptBranchCashFailedSummary(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (
      !req.body.startDate ||
      !req.body.endDate ||
      !req.body.unitId ||
      !req.body.unitName
    ) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let params = {
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      unitId: req.body.unitId,
    };
    let result = await reportRepo.rptBranchCashFailedSummary(params);
    if (result.status === "success") {
      htmlPdfService.getRptBranchCashFailedSummary(
        "รายงานการนำส่งธนบัตรชำรุด",
        req.body.unitName,
        "masp-cash_รายงานการนำส่งธนบัตรชำรุด",
        result.data,
        res
      );
    } else {
      console.error(result.message);
      return res
        .status(200)
        .json(helperService.responseResult("error", result.message, 0, []));
    }
  }

  async function rptCenterCashFailedSummary(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (!req.body.startDate || !req.body.endDate || !req.body.docType) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let params = {
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      cashCenter: req.body.cashCenter,
    };
    let result = await reportRepo.rptCenterCashFailedSummary(params);
    if (result.status === "success") {
      let dateThStart =
        req.body.startDate.substring(6, 8) +
        " " +
        helperService.covertMonthThai1(
          parseInt(req.body.startDate.substring(4, 6))
        ) +
        " " +
        helperService.convertYearTh(req.body.startDate.substring(0, 4));

      let dateThEnd =
        req.body.endDate.substring(6, 8) +
        " " +
        helperService.covertMonthThai1(
          parseInt(req.body.endDate.substring(4, 6))
        ) +
        " " +
        helperService.convertYearTh(req.body.endDate.substring(0, 4));

      let subheader =
        "ตั้งแต่วันที่ " + dateThStart + " ถึงวันที่ " + dateThEnd;
      if (req.body.docType === "pdf") {
        htmlPdfService.getRptCenterCashFailedSummary(
          "รายงานการนำส่งธนบัตรชำรุด",
          subheader,
          "masp-cash_รายงานการนำส่งธนบัตรชำรุด",
          result.data,
          res
        );
      } else if (req.body.docType === "excel") {
        excelService.getRptCenterCashFailedSummary(
          "รายงานการนำส่งธนบัตรชำรุด",
          subheader,
          "masp-cash_รายงานการนำส่งธนบัตรชำรุด",
          result.data,
          res
        );
      } else {
        return res
          .status(200)
          .json(
            helperService.responseResult(
              "กรุณาระบุรูปแบบเอกสาร",
              result.message,
              0,
              []
            )
          );
      }
    } else {
      console.error(result.message);
      return res
        .status(200)
        .json(helperService.responseResult("error", result.message, 0, []));
    }
  }

  async function rptUserSystem(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (!req.body.unitId || !req.body.unitName) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let params = {
      unitId: req.body.unitId,
    };
    let result = await reportRepo.rptUserSystem(params);
    if (result.status === "success") {
      pdfService.genRptUserSystem(
        "รายงานตรวจสอบผู้ใช้งานระบบงานบริหารจัดการธนบัตร",
        req.body.unitName,
        "masp-cash_รายงานตรวจสอบผู้ใช้งานระบบงานบริหารจัดการธนบัตร",
        result.data,
        res
      );
    } else {
      console.error(result.message);
      return res
        .status(200)
        .json(helperService.responseResult("error", result.message, 0, []));
    }
  }

  async function rptCashDiff(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (!req.body.startDate || !req.body.endDate || !req.body.docType) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let params = {
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      cashCenter: req.body.cashCenter,
    };
    let result = await reportRepo.rptCashDiff(params);
    if (result.status === "success") {
      let dateThStart =
        req.body.startDate.substring(6, 8) +
        " " +
        helperService.covertMonthThai1(
          parseInt(req.body.startDate.substring(4, 6))
        ) +
        " " +
        helperService.convertYearTh(req.body.startDate.substring(0, 4));

      let dateThEnd =
        req.body.endDate.substring(6, 8) +
        " " +
        helperService.covertMonthThai1(
          parseInt(req.body.endDate.substring(4, 6))
        ) +
        " " +
        helperService.convertYearTh(req.body.endDate.substring(0, 4));

      let subheader =
        "ตั้งแต่วันที่ " + dateThStart + " ถึงวันที่ " + dateThEnd;

      if (req.body.docType === "pdf") {
        pdfService.getRptCashDiff(
          req.body.cashCenterName
            ? "รายงานขาดเกิน : " + req.body.cashCenterName
            : "รายงานขาดเกิน",
          subheader,
          "masp-cash_รายงานขาดเกิน",
          result.data,
          res
        );
      } else if (req.body.docType === "excel") {
        excelService.getRptCashDiff(
          req.body.cashCenterName
            ? "รายงานขาดเกิน : " + req.body.cashCenterName
            : "รายงานขาดเกิน",
          subheader,
          "masp-cash_รายงานขาดเกิน",
          result.data,
          res
        );
      } else {
        return res
          .status(200)
          .json(
            helperService.responseResult(
              "กรุณาระบุรูปแบบเอกสาร",
              result.message,
              0,
              []
            )
          );
      }
    } else {
      console.error(result.message);
      return res
        .status(200)
        .json(helperService.responseResult("error", result.message, 0, []));
    }
  }

  async function rptDocumentCashRequestWithdrawDeposit(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (
      !req.body.documentDate ||
      !req.body.transType ||
      !req.body.cashCenterName
    ) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let params = {
      documentDate: req.body.documentDate,
      transType: req.body.transType,
      cashCode: req.body.cashCode,
    };
    let result = await reportRepo.rptDocumentCashRequestWithdrawDeposit(params);
    if (result.status === "success") {
      let documentDateTh =
        req.body.documentDate.substring(6, 8) +
        " " +
        helperService.covertMonthThai1(
          parseInt(req.body.documentDate.substring(4, 6))
        ) +
        " " +
        helperService.convertYearTh(req.body.documentDate.substring(0, 4));

      let subheader = "วันที่ " + documentDateTh;

      if (req.body.docType === "pdf") {
        htmlPdfService.getDocumentCashRequestWithdrawDeposit(
          req.body.transType === "ฝาก"
            ? "เอกสารแจ้งความต้องการฝาก : " + req.body.cashCenterName
            : "เอกสารแจ้งความต้องการถอน : " + req.body.cashCenterName,
          subheader,
          req.body.transType === "ฝาก"
            ? "masp-cash_เอกสารแจ้งความต้องการฝาก"
            : "masp-cash_เอกสารแจ้งความต้องการถอน",
          result.data,
          res
        );
      } else if (req.body.docType === "excel") {
        excelService.getDocumentCashRequestWithdrawDeposit(
          req.body.transType === "ฝาก"
            ? "เอกสารแจ้งความต้องการฝาก : " + req.body.cashCenterName
            : "เอกสารแจ้งความต้องการถอน : " + req.body.cashCenterName,
          subheader,
          req.body.transType === "ฝาก"
            ? "masp-cash_เอกสารแจ้งความต้องการฝาก"
            : "masp-cash_เอกสารแจ้งความต้องการถอน",
          result.data,
          res
        );
      } else {
        return res
          .status(200)
          .json(
            helperService.responseResult(
              "กรุณาระบุรูปแบบเอกสาร",
              result.message,
              0,
              []
            )
          );
      }
    } else {
      console.error(result.message);
      return res
        .status(200)
        .json(helperService.responseResult("error", result.message, 0, []));
    }
  }

  async function rptCashFake(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (!req.body.startDate || !req.body.endDate || !req.body.docType) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let params = {
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      cashCenter: req.body.cashCenter,
    };

    let result = await reportRepo.rptCashFake(params);

    if (result.status === "success") {
      let dateThStart =
        req.body.startDate.substring(6, 8) +
        " " +
        helperService.covertMonthThai1(
          parseInt(req.body.startDate.substring(4, 6))
        ) +
        " " +
        helperService.convertYearTh(req.body.startDate.substring(0, 4));

      let dateThEnd =
        req.body.endDate.substring(6, 8) +
        " " +
        helperService.covertMonthThai1(
          parseInt(req.body.endDate.substring(4, 6))
        ) +
        " " +
        helperService.convertYearTh(req.body.endDate.substring(0, 4));

      let subheader =
        "ตั้งแต่วันที่ " + dateThStart + " ถึงวันที่ " + dateThEnd;

      if (req.body.docType === "pdf") {
        pdfService.getRptCashFake(
          "รายงานการนำส่งธนบัตรปลอม",
          subheader,
          "masp-cash_รายงานการนำส่งธนบัตรปลอม",
          result.data,
          res
        );
      } else if (req.body.docType === "excel") {
        excelService.getRptCashFake(
          "รายงานการนำส่งธนบัตรปลอม",
          subheader,
          "masp-cash_รายงานการนำส่งธนบัตรปลอม",
          result.data,
          res
        );
      } else {
        return res
          .status(200)
          .json(
            helperService.responseResult(
              "กรุณาระบุรูปแบบเอกสาร",
              result.message,
              0,
              []
            )
          );
      }
    } else {
      console.error(result.message);
      return res
        .status(200)
        .json(helperService.responseResult("error", result.message, 0, []));
    }
  }

  async function rptSendAndReceiveCashConfirmByFillter(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (!req.body.receiveDate || !req.body.unitId || !req.body.unitName) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    //Get Document no and cash center name
    let paramsGetDocs = {
      receiveDate: req.body.receiveDate,
      unitId: req.body.unitId,
    };

    let paramsGetCashCenter = {
      unitId: req.body.unitId,
    };

    let getDocResult = await reportRepo.selectDocumentNoForExport(
      paramsGetDocs
    );
    let getCashCenterResult = await reportRepo.selectCashCenterName(
      paramsGetCashCenter
    );

    if (
      getDocResult.status !== "success" ||
      getCashCenterResult.status !== "success"
    ) {
      console.error(
        getDocResult.status !== "success"
          ? getDocResult.message
          : getCashCenterResult.status !== "success"
          ? getCashCenterResult.message
          : ""
      );

      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "เกิดข้อผิดพลาดในการดึงข้อมูล",
            0,
            []
          )
        );
    }

    //Get Data for export to report
    let paramsSendCash = {
      documentNo: getDocResult.data[0].documentNo,
    };
    let paramsReceiveCash = {
      documentNo: getDocResult.data[0].documentNo,
    };

    let resultSendCash = await reportRepo.rptSendCashConfirmByDocno(
      paramsSendCash
    );
    let resultReceiveCash = await reportRepo.rptReceiveCashConfirmByDocno(
      paramsReceiveCash
    );

    if (
      resultSendCash.status === "success" &&
      resultReceiveCash.status === "success"
    ) {
      let documentDate =
        req.body.receiveDate.substring(6, 8) +
        " " +
        helperService.covertMonthThai1(
          parseInt(req.body.receiveDate.substring(4, 6))
        ) +
        " " +
        helperService.convertYearTh(req.body.receiveDate.substring(0, 4));
      //Write file to export report
      htmlPdfService.getRptReceiveCashConfirmByDocno(
        getDocResult.data[0].documentNo,
        documentDate,
        req.body.unitName,
        getCashCenterResult.data[0].cashCenter,
        resultSendCash.data,
        resultReceiveCash.data,
        "masp-cash_ใบนำส่งเงิน(อส.92)-ใบถอนเงิน",
        res
      );
    } else {
      console.error(
        resultSendCash.status !== "success"
          ? resultSendCash.message
          : resultReceiveCash.status !== "success"
          ? resultReceiveCash.message
          : ""
      );
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            resultSendCash.status !== "success"
              ? resultSendCash.message
              : resultReceiveCash.status !== "success"
              ? resultReceiveCash.message
              : "",
            0,
            []
          )
        );
    }
  }

  return {
    rptCashRequestByDocno,
    rptSendCashConfirmByDocno,
    rptReceiveCashConfirmByDocno,
    rptSendCashConfirmByFillter,
    rptReceiveCashConfirmByFillter,
    rptCashRequestCashCenter,
    rptCashRequestSummary,
    rptBranchCashFailedSummary,
    rptCenterCashFailedSummary,
    rptUserSystem,
    rptCashDiff,
    rptDocumentCashRequestWithdrawDeposit,
    rptCashFake,
    rptSendAndReceiveCashConfirmByFillter,
  };
}

module.exports = ReportService;
