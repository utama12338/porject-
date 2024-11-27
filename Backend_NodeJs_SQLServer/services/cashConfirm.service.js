const helperService = require("./helper.service");
const cashConfirmRepo = require("../repositorys/cashConfirm.repository");
const { format, addYears } = require("date-fns");

function CashConfirmService() {
  async function getDocNo(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }
    if (!req.body.unitId) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    const yyMM = format(addYears(new Date(), 543), "yyMM");
    const unitCode = await helperService.convertIdTo4Code(req.body.unitId);
    let paramsCheck = {
      unitId: req.body.unitId,
      dateDoc: yyMM + "-" + unitCode,
    };

    let lastNo = await cashConfirmRepo.getLastRunningNo(paramsCheck);
    let autoNo =
      lastNo.data <= 0
        ? 1
        : parseInt(lastNo.data.substring(lastNo.data.length - 3)) + 1;
    let genNo = await helperService.convertIdTo3Code(autoNo);

    let paramsSave = {
      documentNo: yyMM + "-" + unitCode + "-" + genNo,
      unitId: req.body.unitId,
    };
    let result = await cashConfirmRepo.saveLogDocumentNo(paramsSave);
    if (result.status === "success") {
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "succss",
            "OK",
            1,
            yyMM + "-" + unitCode + "-" + genNo
          )
        );
    } else {
      console.error("Error can't generate document no ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถ generate เลขที่เอกสารได้",
            0,
            []
          )
        );
    }
  }

  async function findCashHeader(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (
      !req.body.startDate ||
      !req.body.endDate ||
      !req.body.unitId ||
      !req.body.statusId
    ) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    } else {
      let params = {
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        unitId: req.body.unitId,
        unitName: req.body.unitName,
        statusId: req.body.statusId,
      };

      let result = await cashConfirmRepo.findCashHeader(params);
      if (result.status === "success") {
        return res.status(200).json(result);
      } else {
        console.error("Error can't find cash confirm data. ", result);
        return res
          .status(200)
          .json(
            helperService.responseResult(
              "error",
              "ค้นหาข้อมูลยืนยันการรับส่งไม่สำเร็จ",
              0,
              []
            )
          );
      }
    }
  }

  async function findCashDetail(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }
    if (!req.body.idH) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    } else {
      let params = {
        idH: req.body.idH,
      };

      let result = await cashConfirmRepo.findCashDetail(params);
      if (result.status === "success") {
        return res.status(200).json(result);
      } else {
        console.error("Error can't find cash confirm data. ", result);
        return res
          .status(200)
          .json(
            helperService.responseResult(
              "error",
              "ค้นหารายละเอียดข้อมูลยืนยันการรับส่งไม่สำเร็จ",
              0,
              []
            )
          );
      }
    }
  }

  async function confirmCash(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (
      !req.body.idH ||
      !req.body.confirmBy ||
      !req.body.confirmFlag ||
      !req.body.details ||
      !req.body.confirmType
    ) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let paramsD = {
      idH: req.body.idH,
      confirmFlag: req.body.confirmFlag,
      confirmType: req.body.confirmType,
      details: req.body.details,
    };

    let resultD = await cashConfirmRepo.confirmDetail(paramsD);

    if (resultD.status === "success") {
      let paramsH = {
        idH: req.body.idH,
        confirmBy: req.body.confirmBy,
        confirmFlag: req.body.confirmFlag,
        confirmType: req.body.confirmType,
        receiveCash1: req.body.receiveCash1,
        receiveCash2: req.body.receiveCash2,
        documentRemark: req.body.documentRemark,
        sendCash1: req.body.sendCash1,
        sendCash2: req.body.sendCash2
      };

      let resultH = await cashConfirmRepo.confirmHeader(paramsH);

      if (resultH.status === "success") {
        return res.status(200).json(resultH);
      } else {
        console.error("Error can't confirm cash Header data.  ", resultH);
        return res
          .status(200)
          .json(
            helperService.responseResult(
              "error",
              "ไม่สามารถยืนยันข้อมูลรายละเอียดการยืนยันรับส่งได้",
              0,
              []
            )
          );
      }
    } else {
      console.error("Error can't confirm cash Detail data. ", resultD);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถยืนยันข้อมูลรายละเอียดการยืนยันรับส่งได้",
            0,
            []
          )
        );
    }
  }

  async function updateCash(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (
      !req.body.idH ||
      !req.body.statusId ||
      !req.body.updateBy ||
      !req.body.confirmFlag ||
      !req.body.details ||
      !req.body.confirmType ||
      !req.body.receiveCash1
    ) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    if (req.body.statusId === 8) {
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "สถานะนี้ไม่สามารถแก้ไขข้อมูลได้",
            0,
            []
          )
        );
    }

    let resultDelete = await cashConfirmRepo.deleteDetail({
      idH: req.body.idH,
    });
    if (resultDelete.status === "success") {
      let paramsD = {
        idH: req.body.idH,
        confirmFlag: req.body.confirmFlag,
        confirmType: req.body.confirmType,
        details: req.body.details,
      };
      let resultD = await cashConfirmRepo.confirmDetail(paramsD);
      if (resultD.status === "success") {
        let paramsH = {
          updateBy: req.body.updateBy,
          idH: req.body.idH,
        };

        let resultH = await cashConfirmRepo.updateCashHeader(paramsH);

        if (resultH.status === "success") {
          return res.status(200).json(result);
        } else {
          console.error("Error can't update confirm cash. ", resultH);
          return res
            .status(200)
            .json(
              helperService.responseResult(
                "error",
                "ไม่สามารถปรับปรุงข้อมูลรายละเอียดการยืนยันรับส่งได้",
                0,
                []
              )
            );
        }
      } else {
        console.error("Error can't confirm cash data. ", resultD);
        return res
          .status(200)
          .json(
            helperService.responseResult(
              "error",
              "ไม่สามารถปรับปรุงข้อมูลรายละเอียดการยืนยันรับส่งได้",
              0,
              []
            )
          );
      }
    } else {
      console.error("Error can't delete confirm cash detail. ", resultDelete);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ลบข้อมูลรายละเอียดการยืนยันรับส่งไม่สำเร็จ",
            0,
            []
          )
        );
    }
  }

  async function resetCash(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }
    if (
      !req.body.idH ||
      !req.body.resetBy ||
      !req.body.resetByFlag ||
      !req.body.resetRemark
    ) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    if (req.body.statusId === 5) {
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "สถานะนี้ไม่สามารถปลดล็อคได้",
            0,
            []
          )
        );
    }

    let params = {
      idH: req.body.idH,
      resetBy: req.body.resetBy,
      resetByFlag: req.body.resetByFlag,
      resetRemark: req.body.resetRemark,
    };

    let result = await cashConfirmRepo.resetCash(params);
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't reset confirm cash. ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถปลดล็อคเอกสารการยืนยันรับส่งได้",
            0,
            []
          )
        );
    }
  }

  return {
    getDocNo,
    findCashHeader,
    findCashDetail,
    confirmCash,
    updateCash,
    resetCash,
  };
}

module.exports = CashConfirmService;
