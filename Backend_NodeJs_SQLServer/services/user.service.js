const userRepo = require("../repositorys/user.repository");
const helperService = require("../services/helper.service");

function UserService() {
  function findUser(req, res) {
    let params = {
      username: req.body.username,
    };
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    userRepo
      .getUser(params)
      .then((result) => {
        if (result[0].length > 0) {
          return res
            .status(200)
            .json(
              helperService.responseResult(
                "success",
                "successfully",
                result[0].size,
                result[0]
              )
            );
        } else {
          console.error("username is incorrect");
          return res
            .status(200)
            .json(
              helperService.responseResult(
                "error",
                "username is incorrect",
                0,
                []
              )
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

  async function addUser(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (
      !req.body.userName ||
      !req.body.firstName ||
      !req.body.org64 ||
      !req.body.unitName ||
      !req.body.roleId ||
      !req.body.position
    ) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    }

    let checkUserDup = await userRepo.checkUserDup({
      userName: req.body.userName,
    });

    if (checkUserDup.status === "success") {
      if (!checkUserDup.data) {
        
        let params = {
          userName: req.body.userName,
          firstName: req.body.firstName,
          unitName: req.body.unitName,
          org64: req.body.org64,
          roleId: req.body.roleId,
          position: req.body.position,
          unitId: req.body.unitId
        };

        userRepo
          .addUser(params)
          .then((result) => {
            return res
              .status(200)
              .json(
                helperService.responseResult("success", "successfully", 0, [])
              );
          })
          .catch((error) => {
            console.error(error);
            return res
              .status(200)
              .json(helperService.responseResult("error", error, 0, []));
          });
      } else {
        return res
          .status(200)
          .json(
            helperService.responseResult(
              "error",
              "User : " + req.body.userName + " มีอยู่ในระบบแล้ว",
              0,
              []
            )
          );
      }
    } else {
      console.error("Error check user dupplicate " + checkUserDup);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "เพิ่มผู้ใช้งานไม่สำเร็จ",
            0,
            []
          )
        );
    }
  }

  function findRoleUser(req, res) {
    let params = {
      username: req.body.username,
    };

    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    userRepo
      .findRoleByUser(params)
      .then((result) => {
        if (result[0].length > 0) {
          return res
            .status(200)
            .json(
              helperService.responseResult(
                "success",
                "successfully",
                result[0].size,
                result[0]
              )
            );
        } else {
          console.error("username is incorrect");
          return res
            .status(200)
            .json(
              helperService.responseResult(
                "error",
                "username is incorrect",
                0,
                []
              )
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

  function findMenuUser(req, res) {
    let params = {
      username: req.body.username,
    };

    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    userRepo
      .findMenuByUser(params)
      .then((result) => {
        if (result[0].length > 0) {
          return res
            .status(200)
            .json(
              helperService.responseResult(
                "success",
                "successfully",
                result[0].size,
                result[0]
              )
            );
        } else {
          console.error("username is incorrect");
          return res
            .status(200)
            .json(
              helperService.responseResult(
                "error",
                "sername is incorrect",
                0,
                []
              )
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

  async function register(req, res) {
    if (
      !req.body.userName ||
      !req.body.firstName ||
      !req.body.org64 ||
      !req.body.unitName
    ) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    } else {
      let checkUserDup = await userRepo.checkUserDup({
        userName: req.body.userName,
      });
      if (checkUserDup.status === "success") {
        if (!checkUserDup.data) {
          let params = {
            userName: req.body.userName,
            firstName: req.body.firstName,
            unitName: req.body.unitName,
            org64: req.body.org64,
          };

          let result = await userRepo.register(params);

          if (result.status === "success") {
            return res
              .status(200)
              .json(
                helperService.responseResult(
                  result.status,
                  result.message + " ลงทะเบียนเข้าใช้งานสำเร็จ",
                  result.size,
                  result.data
                )
              );
          } else {
            console.error("Error check user dupplicate " + checkUserDup);
            return res
              .status(200)
              .json(
                helperService.responseResult(
                  "error",
                  "ลงทะเบียนเข้าใช้งานไม่สำเร็จ",
                  0,
                  []
                )
              );
          }
        } else {
          return res
            .status(200)
            .json(
              helperService.responseResult(
                "error",
                "User : " + req.body.userName + " มีการลงทะเบียนเข้าใช้งานแล้ว",
                0,
                []
              )
            );
        }
      } else {
        console.error("Error check user dupplicate " + checkUserDup);
        return res
          .status(200)
          .json(
            helperService.responseResult(
              "error",
              "ลงทะเบียนเข้าใช้งานไม่สำเร็จ",
              0,
              []
            )
          );
      }
    }
  }

  async function searchUser(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    let params = {
      userName: req.body.userName,
      name: req.body.name,
      unitName: req.body.unitName,
      roleId: req.body.roleId,
      activeStatus: req.body.activeStatus,
    };

    let result = await userRepo.findUser(params);

    if (result.status === "success") {
      return res.status(200).json(result);
    } else {
      console.error("Error can't search user " + result);
      return res
        .status(200)
        .json(
          helperService.responseResult(
            "error",
            "ค้นหาข้อมูลผู้ใช้งานไม่สำเร็จ",
            0,
            []
          )
        );
    }
  }

  async function updateUser(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (
      !req.body.userName ||
      !req.body.name ||
      !req.body.unitName ||
      !req.body.org64 ||
      !req.body.roleId ||
      !req.body.activeStatus ||
      !req.body.unitId ||
      !req.body.position ||
      !req.body.userId
    ) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    } else {
      let params = {
        userName: req.body.userName,
        name: req.body.name,
        unitName: req.body.unitName,
        org64: req.body.org64,
        roleId: req.body.roleId,
        activeStatus: req.body.activeStatus,
        unitId: req.body.unitId,
        position: req.body.position,
        userId: req.body.userId,
      };

      let result = await userRepo.updateUser(params);

      if (result.status === "success") {
        return res.status(200).json(result);
      } else {
        console.error("Error can't search user " + result);
        return res
          .status(200)
          .json(
            helperService.responseResult(
              "error",
              "ปรับปรุงข้อมูลผู้ใช้งานไม่สำเร็จ",
              0,
              []
            )
          );
      }
    }
  }

  async function deleteUser(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (!req.body.userId) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    } else {
      let params = {
        userId: req.body.userId,
      };

      let result = await userRepo.deleteUser(params);

      if (result.status === "success") {
        return res.status(200).json(result);
      } else {
        console.error("Error can't search user " + result);
        return res
          .status(200)
          .json(
            helperService.responseResult(
              "error",
              "ลบข้อมูลผู้ใช้งานไม่สำเร็จ",
              0,
              []
            )
          );
      }
    }
  }

  return {
    findUser,
    addUser,
    findRoleUser,
    findMenuUser,
    register,
    searchUser,
    updateUser,
    deleteUser,
  };
}

module.exports = UserService;
