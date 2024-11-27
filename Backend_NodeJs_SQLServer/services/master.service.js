const masterRepo = require("../repositorys/master.respository");
const helperService = require("../services/helper.service");

function MasterService() {
  function getCash(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }
    masterRepo
      .getCash()
      .then((result) => {
        if (result[0].length > 0) {
          return res
            .status(200)
            .json(
              helperService.responseResult(
                "success",
                "get data successfully",
                result[0].size,
                result[0]
              )
            );
        } else {
          console.error("Failed for get cash data");
          return res
            .status(200)
            .json(
              helperService.responseResult("error", "get data is failed", 0, [])
            );
        }
      })
      .catch((error) => {
        console.error(error);
        return res
          .status(200)
          .json(helperService.responseResult("error", error, 0, []));
      });
  }

  function getCashType(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }
    masterRepo
      .getCashType()
      .then((result) => {
        if (result[0].length > 0) {
          return res
            .status(200)
            .json(
              helperService.responseResult(
                "success",
                "get data successfully",
                result[0].size,
                result[0]
              )
            );
        } else {
          console.error("Failed for get cash data");
          return res
            .status(200)
            .json(
              helperService.responseResult("error", "get data is failed", 0, [])
            );
        }
      })
      .catch((error) => {
        console.error(error);
        return res
          .status(200)
          .json(helperService.responseResult("error", error, 0, []));
      });
  }

  function getTransactionType(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }
    masterRepo
      .getTransactionType()
      .then((result) => {
        if (result[0].length > 0) {
          return res
            .status(200)
            .json(
              helperService.responseResult(
                "success",
                "get data successfully",
                result[0].size,
                result[0]
              )
            );
        } else {
          console.error("Failed for get cash data");
          return res
            .status(200)
            .json(
              helperService.responseResult("error", "get data is failed", 0, [])
            );
        }
      })
      .catch((error) => {
        console.error(error);
        return res
          .status(200)
          .json(helperService.responseResult("error", error, 0, []));
      });
  }

  async function getUnitInformation(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    let result = await masterRepo.getUnitInformation();
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't get unit information ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถดึงข้อมูลหน่วยงานได้",
            0,
            []
          )
        );
    }
  }

  async function getUnitInformationType(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    let result = await masterRepo.getUnitInformationType();
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't get unit information type ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถดึงข้อมูลประเภทหน่วยงานได้",
            0,
            []
          )
        );
    }
  }

  async function getStatus(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    let result = await masterRepo.getStatus();
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't get status ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถดึงข้อมูลสถานะได้",
            0,
            []
          )
        );
    }
  }

  async function getUnitInformationByUnitType(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (!req.body.unitTypeId) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let result = await masterRepo.getUnitInformationByUnitType({
      unitTypeId: req.body.unitTypeId,
    });
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't get unit information ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถดึงข้อมูลหน่วยงานได้",
            0,
            []
          )
        );
    }
  }

  async function getCashCenter(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    let result = await masterRepo.getCashCenter();
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't get cash center ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถดึงข้อมูลศูนย์เงินสดได้",
            0,
            []
          )
        );
    }
  }

  async function addCashCenter(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (!req.body.cashCenterCode || !req.body.cashCenterName) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let checkDupp = await masterRepo.checkCashCenterDupplicate({
      cashCenterCode: req.body.cashCenterCode,
    });

    if (checkDupp.status !== "success") {
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "warning",
            +req.body.cashCenterCode +
              " " +
              req.body.cashCenterName +
              "มีในระบบแล้ว",
            0,
            []
          )
        );
    }

    let param = {
      cashCenterCode: req.body.cashCenterCode,
      cashCenterName: req.body.cashCenterName,
    };
    let result = await masterRepo.addCashCenter(param);

    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't add cash center ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถเพิ่มข้อมูลศูนย์เงินสดได้",
            0,
            []
          )
        );
    }
  }

  async function editCashCenter(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (!req.body.cashCenterCode || !req.body.cashCenterName) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let param = {
      cashCenterCode: req.body.cashCenterCode,
      cashCenterName: req.body.cashCenterName,
      cashCenterActive: req.body.cashCenterActive,
    };
    let result = await masterRepo.editCashCenter(param);

    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't edit cash center ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถแก้ไขข้อมูลศูนย์เงินสดได้",
            0,
            []
          )
        );
    }
  }

  async function deleteCashCenter(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (!req.body.cashCenterCode) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let param = {
      cashCenterCode: req.body.cashCenterCode,
    };
    let result = await masterRepo.deleteCashCenter(param);

    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't delete cash center ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถลบข้อมูลศูนย์เงินสดได้",
            0,
            []
          )
        );
    }
  }

  async function getCashCenterByName(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (!req.body.cashCenterName) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let param = {
      cashCenterName: req.body.cashCenterName,
    };
    let result = await masterRepo.getCashCenterByName(param);

    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't delete cash center ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถค้นหาข้อมูลศูนย์เงินสดได้",
            0,
            []
          )
        );
    }
  }

  async function checkCashAmount(req, res) {
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

    let result = await masterRepo.checkCashAmount({ unitId: req.body.unitId });

    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't check cash amount ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถตรวจสอบข้อมูลวงเงินเก็บรักษาได้",
            0,
            []
          )
        );
    }
  }

  async function addUnitInformation(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (
      !req.body.unitName ||
      !req.body.unitTypeId ||
      !req.body.regionCode ||
      !req.body.zoneCode ||
      !req.body.costCenter ||
      !req.body.cashCenter ||
      !req.body.unitProvince ||
      !req.body.unitAddress ||
      !req.body.workDayId ||
      !req.body.workTimeStart ||
      !req.body.workTimeEnd ||
      !req.body.cutOffTimeId ||
      !req.body.cashSaveLimit ||
      !req.body.tier ||
      !req.body.ipPhone ||
      !req.body.serviceDay ||
      !req.body.remark
    ) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let param = {
      unitName: req.body.unitName,
      unitTypeId: req.body.unitTypeId,
      regionCode: req.body.regionCode,
      zoneCode: req.body.zoneCode,
      costCenter: req.body.costCenter,
      cashCenter: req.body.cashCenter,
      unitProvince: req.body.unitProvince,
      unitAddress: req.body.unitAddress,
      workDayId: req.body.workDayId,
      workTimeStart: req.body.workTimeStart,
      workTimeEnd: req.body.workTimeEnd,
      cutOffTimeId: req.body.cutOffTimeId,
      cashSaveLimit: req.body.cashSaveLimit,
      tier: req.body.tier,
      ipPhone: req.body.ipPhone,
      serviceDay: req.body.serviceDay,
      remark: req.body.remark,
    };

    let result = await masterRepo.addUnitInformation(param);

    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't add new unit information ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถเพิ่มข้อมูลหน่วยงานได้",
            0,
            []
          )
        );
    }
  }

  async function editUnitInformation(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (
      !req.body.unitId ||
      !req.body.unitName ||
      !req.body.unitTypeId ||
      !req.body.regionCode ||
      !req.body.zoneCode ||
      !req.body.costCenter ||
      !req.body.cashCenter ||
      !req.body.unitProvince ||
      !req.body.unitAddress ||
      !req.body.workDayId ||
      !req.body.workTimeStart ||
      !req.body.workTimeEnd ||
      !req.body.cutOffTimeId ||
      !req.body.cashSaveLimit ||
      !req.body.tier ||
      !req.body.ipPhone ||
      !req.body.serviceDay ||
      !req.body.remark
    ) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let param = {
      unitId: req.body.unitId,
      unitName: req.body.unitName,
      unitTypeId: req.body.unitTypeId,
      regionCode: req.body.regionCode,
      zoneCode: req.body.zoneCode,
      costCenter: req.body.costCenter,
      cashCenter: req.body.cashCenter,
      unitProvince: req.body.unitProvince,
      unitAddress: req.body.unitAddress,
      workDayId: req.body.workDayId,
      workTimeStart: req.body.workTimeStart,
      workTimeEnd: req.body.workTimeEnd,
      cutOffTimeId: req.body.cutOffTimeId,
      cashSaveLimit: req.body.cashSaveLimit,
      tier: req.body.tier,
      ipPhone: req.body.ipPhone,
      serviceDay: req.body.serviceDay,
      remark: req.body.remark,
      unitActive: req.body.unitActive,
    };

    let result = await masterRepo.editUnitInformation(param);

    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't edit unit information ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถแก้ไขข้อมูลหน่วยงานได้",
            0,
            []
          )
        );
    }
  }

  async function deleteUnitInformation(req, res) {
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

    let result = await masterRepo.deleteUnitInformation({
      unitId: req.body.unitId,
    });

    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't delete unit information ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถลบข้อมูลหน่วยงานได้",
            0,
            []
          )
        );
    }
  }

  async function getRegion(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    let result = await masterRepo.getRegion();
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't get region ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถดึงข้อมูลภาคได้",
            0,
            []
          )
        );
    }
  }

  async function getZone(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    let result = await masterRepo.getZone();
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't get zone ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถดึงข้อมูลเขตได้",
            0,
            []
          )
        );
    }
  }

  async function getProvince(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    let result = await masterRepo.getProvince();
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't get province ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถดึงข้อมูลจังหวัดได้",
            0,
            []
          )
        );
    }
  }

  async function getWorkDay(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    let result = await masterRepo.getWorkDay();
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't get work day ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถดึงข้อมูลวันทำการได้",
            0,
            []
          )
        );
    }
  }

  async function getCutOffTime(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    let result = await masterRepo.getCutOffTime();
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't get cut off time ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถดึงข้อมูล Cut-off Time ได้",
            0,
            []
          )
        );
    }
  }

  async function getUnitInformationDetail(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    let param = {
      unitName: req.body.unitName,
      zoneCode: req.body.zoneCode,
      regionCode: req.body.regionCode,
      cashCenterCode: req.body.cashCenterCode,
      unitTypeId: req.body.unitTypeId,
    };

    let result = await masterRepo.getUnitInformationDetail(param);
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't get unit information detail ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถดึงข้อมูลหน่วยงานได้",
            0,
            []
          )
        );
    }
  }

  async function getCashTypeByCashAndTransType(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (!req.body.cashId || !req.body.unitTypeId || !req.body.transTypeId) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let result = await masterRepo.getCashTypeByCashAndTransType({
      unitTypeId: req.body.unitTypeId,
      cashId: req.body.cashId,
      transTypeId: req.body.transTypeId,
    });
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't get cash type ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถดึงข้อมูลความต้องการได้",
            0,
            []
          )
        );
    }
  }

  async function getTransTypeByUnitType(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (!req.body.unitTypeId) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let result = await masterRepo.getTransTypeByUnitType({
      unitTypeId: req.body.unitTypeId,
    });
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't get transaction type ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถดึงข้อมูลประเภทรายการได้",
            0,
            []
          )
        );
    }
  }

  async function getCashSearch(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    let result = await masterRepo.getCashSearch({ cashId: req.body.cashId });
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't get cash ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถดึงข้อมูลชนิดราคาได้",
            0,
            []
          )
        );
    }
  }

  async function addCash(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (!req.body.cashAmountName || !req.body.cashPerAmount) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let result = await masterRepo.addCash({
      cashAmountName: req.body.cashAmountName,
      cashPerAmount: req.body.cashPerAmount,
    });
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't add cash ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถเพิ่มข้อมูลชนิดราคาได้",
            0,
            []
          )
        );
    }
  }

  async function editCash(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (
      !req.body.cashId ||
      !req.body.cashAmountName ||
      !req.body.cashPerAmount
    ) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    const param = {
      cashId: req.body.cashId,
      cashAmountName: req.body.cashAmountName,
      cashPerAmount: req.body.cashPerAmount,
      cashActive: req.body.cashActive,
    };
    let result = await masterRepo.editCash(param);

    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't edit cash ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถแก้ไขข้อมูลชนิดราคาได้",
            0,
            []
          )
        );
    }
  }

  async function deleteCash(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (!req.body.cashId) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let result = await masterRepo.deleteCash({ cashId: req.body.cashId });

    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't delete cash ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถลบข้อมูลชนิดราคาได้",
            0,
            []
          )
        );
    }
  }

  async function getOthCashTypeAll(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    let result = await masterRepo.getOthCashTypeAll();
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't get other cash type ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถดึงข้อมูลทรัพย์สินอื่นได้",
            0,
            []
          )
        );
    }
  }

  async function addOthCashType(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (!req.body.othCashTypeName) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let param = {
      othCashTypeName: req.body.othCashTypeName,
    };
    let result = await masterRepo.addOthCashType(param);
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't add other cash type ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถเพิ่มข้อมูลทรัพย์สินอื่นได้",
            0,
            []
          )
        );
    }
  }

  async function updateOthCashType(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (!req.body.othCashTypeName) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let param = {
      othCashTypeId: req.body.othCashTypeId,
      othCashTypeName: req.body.othCashTypeName,
      othCashTypeActive: req.body.othCashTypeActive,
    };
    let result = await masterRepo.updateOthCashType(param);
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't edit other cash type ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถแก้ไขข้อมูลทรัพย์สินอื่นได้",
            0,
            []
          )
        );
    }
  }

  async function deleteOthCashType(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (!req.body.othCashTypeId) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let param = {
      othCashTypeId: req.body.othCashTypeId,
    };
    let result = await masterRepo.deleteOthCashType(param);
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't delete other cash type ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถลบข้อมูลทรัพย์สินอื่นได้",
            0,
            []
          )
        );
    }
  }

  async function getCashAsset(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    let param = {
      unitTypeId: req.body.unitTypeId,
    };
    let result = await masterRepo.getCashAsset(param);
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't get cash asset ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถดึงข้อมูลทรัพย์สินได้",
            0,
            []
          )
        );
    }
  }

  async function addCashAsset(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (
      !req.body.cashId ||
      !req.body.cashTypeId ||
      !req.body.cashPerAmount ||
      !req.body.unitTypeId ||
      !req.body.transTypeId
    ) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let param = {
      cashId: req.body.cashId,
      cashTypeId: req.body.cashTypeId,
      cashPerAmount: req.body.cashPerAmount,
      unitTypeId: req.body.unitTypeId,
      transTypeId: req.body.transTypeId,
    };
    let result = await masterRepo.addCashAsset(param);
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't add cash asset ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถเพิ่มข้อมูลทรัพย์สินได้",
            0,
            []
          )
        );
    }
  }

  async function updateCashAsset(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (
      !req.body.id ||
      !req.body.cashId ||
      !req.body.cashTypeId ||
      !req.body.cashPerAmount ||
      !req.body.unitTypeId ||
      !req.body.transTypeId
    ) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let param = {
      id: req.body.id,
      cashId: req.body.cashId,
      cashTypeId: req.body.cashTypeId,
      cashPerAmount: req.body.cashPerAmount,
      unitTypeId: req.body.unitTypeId,
      transTypeId: req.body.transTypeId,
      active: req.body.active,
    };
    let result = await masterRepo.updateCashAsset(param);
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't edit cash asset ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถแก้ไขข้อมูลทรัพย์สินได้",
            0,
            []
          )
        );
    }
  }

  async function deleteCashAsset(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (!req.body.id) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let param = {
      id: req.body.id,
    };
    let result = await masterRepo.deleteCashAsset(param);
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't delete cash asset ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถลบข้อมูลทรัพย์สินได้",
            0,
            []
          )
        );
    }
  }

  async function getHoliday(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    let result = await masterRepo.getHoliday({
      holidayYear: req.body.holidayYear,
    });
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't get holiday ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถค้นหาข้อมูลวันหยุดได้",
            0,
            []
          )
        );
    }
  }

  async function addHoliday(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (
      !req.body.holidayDate ||
      !req.body.holidayName ||
      !req.body.holidayDay ||
      !req.body.holidayYear
    ) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let param = {
      holidayDate: req.body.holidayDate,
      holidayName: req.body.holidayName,
      holidayDay: req.body.holidayDay,
      holidayYear: req.body.holidayYear,
    };

    let result = await masterRepo.addHoliday(param);
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't add holiday ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถเพิ่มวันหยุดได้",
            0,
            []
          )
        );
    }
  }

  async function updateHoliday(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (
      !req.body.holidayId ||
      !req.body.holidayDate ||
      !req.body.holidayName ||
      !req.body.holidayDay ||
      !req.body.holidayYear
    ) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let param = {
      holidayId: req.body.holidayId,
      holidayDate: req.body.holidayDate,
      holidayName: req.body.holidayName,
      holidayDay: req.body.holidayDay,
      holidayYear: req.body.holidayYear,
      holidayActive: req.body.holidayActive,
    };

    let result = await masterRepo.updateHoliday(param);
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't update holiday ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถแก้ไขวันหยุดได้",
            0,
            []
          )
        );
    }
  }

  async function deleteHoliday(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (!req.body.holidayId) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let result = await masterRepo.deleteHoliday({
      holidayId: req.body.holidayId,
    });
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't delete holiday ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถลบวันหยุดได้",
            0,
            []
          )
        );
    }
  }

  async function getEvent(req, res){
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }    

    let result = await masterRepo.getEvent()
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't get event ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถค้นหาข้อมูลประชาสัมพันธ์ได้",
            0,
            []
          )
        );
    }  
  }

  async function showEvent(req, res){
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }    

    let result = await masterRepo.showEvent()
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't show event ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถแสดงข้อมูลประชาสัมพันธ์ได้",
            0,
            []
          )
        );
    }  
  }
 
  async function addEvent(req, res){
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }    

    if (!req.body.eventTitle || !req.body.eventDesc || !req.body.roleView) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let param = {
      eventTitle: req.body.eventTitle,
      eventDesc: req.body.eventDesc,
      isShowAllTime: req.body.isShowAllTime,
      eventDateStart: req.body.eventDateStart,
      eventDateEnd: req.body.eventDateEnd,
      eventTimeStart: req.body.eventTimeStart,
      eventTimeEnd: req.body.eventTimeEnd,
      roleView: req.body.roleView,
      filePath: req.body.filePath,
      fileName: req.body.fileName
    }

    let result = await masterRepo.addEvent(param);
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't add event ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถเพิ่มข้อมูลประชาสัมพันธ์ได้",
            0,
            []
          )
        );
    }  
  }

  async function updateEvent(req, res){
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (!req.body.eventId || !req.body.eventTitle || !req.body.eventDesc || !req.body.roleView) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let param = {
      eventId: req.body.eventId,
      eventTitle: req.body.eventTitle,
      eventDesc: req.body.eventDesc,
      isShowAllTime: req.body.isShowAllTime,
      eventDateStart: req.body.eventDateStart,
      eventDateEnd: req.body.eventDateEnd,
      eventTimeStart: req.body.eventTimeStart,
      eventTimeEnd: req.body.eventTimeEnd,
      roleView: req.body.roleView,
      filePath: req.body.filePath,
      fileName: req.body.fileName
    }

    let result = await masterRepo.updateEvent(param);
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't update event ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถแก้ไขข้อมูลประชาสัมพันธ์ได้",
            0,
            []
          )
        );
    }    
  }

  async function deleteEvent(req, res){
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    } 
    
    if (!req.body.eventId) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let result = await masterRepo.deleteEvent({
      eventId: req.body.eventId,
    });
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't delete event ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถลบข้อมูลประชาสัมพันธ์ได้",
            0,
            []
          )
        );
    }  
  }

  async function getLastIdEvent(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }
    let result = await masterRepo.getLastIdEvent();
    if (result.status === "success") {
      return res
        .status(200)
        .json(
          helperService.responseResult(
            result.status,
            result.message,
            result.size,
            result.data.id
          )
        );
    } else {
      console.error(
        "Error can't get last id from TBLEvent ",
        result
      );
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "can't get last id from TBLEvent",
            0,
            []
          )
        );
    }
  }  

  return {
    getCash,
    getCashType,
    getCashTypeByCashAndTransType,
    getTransactionType,
    getUnitInformation,
    getUnitInformationType,
    getStatus,
    getUnitInformationByUnitType,
    getCashCenter,
    addCashCenter,
    editCashCenter,
    getCashCenterByName,
    deleteCashCenter,
    checkCashAmount,
    addUnitInformation,
    editUnitInformation,
    deleteUnitInformation,
    getRegion,
    getZone,
    getProvince,
    getWorkDay,
    getCutOffTime,
    getUnitInformationDetail,
    getTransTypeByUnitType,
    getCashSearch,
    addCash,
    editCash,
    deleteCash,
    getOthCashTypeAll,
    addOthCashType,
    updateOthCashType,
    deleteOthCashType,
    getCashAsset,
    addCashAsset,
    updateCashAsset,
    deleteCashAsset,
    getHoliday,
    addHoliday,
    updateHoliday,
    deleteHoliday,
    getEvent,
    showEvent,
    addEvent,
    updateEvent,
    deleteEvent,
    getLastIdEvent
  };
}

module.exports = MasterService;
