const _userService = require("../services/user.service");

module.exports = function (router) {
  const userService = _userService();
  
  router.route("/findUser").post(userService.findUser);

  router.route("/addUser").post(userService.addUser);

  router.route("/findRoleUser").post(userService.findRoleUser);

  router.route("/findMenuUser").post(userService.findMenuUser);

  router.route("/register").post(userService.register);

  router.route("/searchUser").post(userService.searchUser);

  router.route("/updateUser").post(userService.updateUser);

  router.route("/deleteUser").post(userService.deleteUser);
};
