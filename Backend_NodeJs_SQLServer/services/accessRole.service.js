const accessRoleRepo = require("../repositorys/accessRole.repository");
const helperService = require("./helper.service");

function AccessRoleService() {
  async function addRole(req, res) {
    let params = {
      roleCode: req.body.roleCode,
      roleName: req.body.roleName,
      roleDesc: req.body.roleDesc,
    };

    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    let result = await accessRoleRepo.addRole(params);
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't add role ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถเพิ่มข้อมูลสิทธิ์การใช้งานระบบได้",
            0,
            []
          )
        );
    }
  }

  async function updateRole(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    let params = {
      roleCode: req.body.roleCode,
      roleName: req.body.roleName,
      activeStatus: req.body.activeStatus,
      roleId: req.body.roleId,
      roleDesc: req.body.roleDesc,
    };

    let result = await accessRoleRepo.addRole(params);
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't update role ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถแก้ไขข้อมูลสิทธิ์การใช้งานระบบได้",
            0,
            []
          )
        );
    }
  }

  async function getRole(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    let result = await accessRoleRepo.getRole();
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't get role ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถดึงข้อมูลสิทธิ์การใช้งานระบบได้",
            0,
            []
          )
        );
    }
  }

  async function findRoleAndMenu(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (
      req.body.roleId === null ||
      req.body.roleId === undefined ||
      req.body.roleId === ""
    ) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    } else {
      let params = {
        roleId: req.body.roleId,
      };
      let result = await accessRoleRepo.getRoleAndMenuByRoleId(params);
      if (result.status === "success") {
        return res.status(200).json(result);
      } else {
        console.error("Error can't get menu by role id ", result);
        return res
          .status(200)
          .json(
            helperService.responseResult(
              "error",
              "ไม่สามารถดึงข้อมูลเมนูตามสิทธิ์การใช้งานระบบได้",
              0,
              []
            )
          );
      }
    }
  }

  async function deleteRole(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (!req.body.roleId) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let params = {
      roleId: req.body.roleId,
    };

    let result = await accessRoleRepo.deleteRole(params);
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't update role ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถลบข้อมูลสิทธิ์การใช้งานระบบได้",
            0,
            []
          )
        );
    }
  }

  async function getLastRoleCode(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    let result = await accessRoleRepo.getLastRoleCode();
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't get last role code", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถค้นหาข้อมูล Code สิทธิ์การใช้งานระบบได้",
            0,
            []
          )
        );
    }
  }

  async function getRoleById(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    let result = await accessRoleRepo.getRoleById({ roleId: req.body.roleId });
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't get role ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถดึงข้อมูลสิทธิ์การใช้งานระบบได้",
            0,
            []
          )
        );
    }
  }

  async function getMenu(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    let result = await accessRoleRepo.getMenu();
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't get menu ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถดึงข้อมูลเมนูระบบได้",
            0,
            []
          )
        );
    }
  }

  async function getMenuAndRoleByMenuId(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    let result = await accessRoleRepo.getMenuAndRoleByMenuId({
      menuId: req.body.menuId,
    });
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't find menu by id ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถค้นหาข้อมูลเมนูระบบได้",
            0,
            []
          )
        );
    }
  }

  async function addRoleAndMenu(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (!req.body.roleId || !req.body.menu) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let params = {
      roleId: req.body.roleId,
      menu: req.body.menu,
    };

    let result = await accessRoleRepo.addRoleAndMenu(params);
    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't add role and menu ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถเพิ่มข้อมูลสิทธิ์การใช้งานและเมนูได้",
            0,
            []
          )
        );
    }
  }

  async function updateRoleAndMenu(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (!req.body.roleId || !req.body.menu) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let paramsDelete = {
      roleId: req.body.roleId,
    };

    let resultDelete = await accessRoleRepo.deleteRoleAndMenu(paramsDelete);
    
    if (resultDelete.status === "success") {
      let params = {
        roleId: req.body.roleId,
        menu: req.body.menu,
      };

      let result = await accessRoleRepo.addRoleAndMenu(params);
      if (result.status === "success") {
        return res.status(200).json(result);
      } else {
        console.error("Error can't add role and menu ", result);
        return res
          .status(200)
          .json(
            helperService.responseResult(
              "error",
              "ไม่สามารถเพิ่มข้อมูลสิทธิ์การใช้งานและเมนูได้",
              0,
              []
            )
          );
      }
    } else {
      console.error("Error can't set unactive role and menu ", result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ไม่สามารถเพิ่มข้อมูลสิทธิ์การใช้งานและเมนูได้",
            0,
            []
          )
        );
    }
  }

  return {
    addRole,
    updateRole,
    getRole,
    findRoleAndMenu,
    deleteRole,
    getLastRoleCode,
    getRoleById,
    getMenu,
    getMenuAndRoleByMenuId,
    addRoleAndMenu,
    updateRoleAndMenu
  };
}

module.exports = AccessRoleService;
