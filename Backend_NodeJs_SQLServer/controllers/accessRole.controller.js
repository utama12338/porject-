const _accessRoleService = require('../services/accessRole.service');

module.exports =  function(router){
    const accessRoleService = _accessRoleService();

    router.route("/addRole").post(accessRoleService.addRole);

    router.route("/updateRole").post(accessRoleService.updateRole);

    router.route("/findRole").post(accessRoleService.getRole);

    router.route("/findRoleAndMenu").post(accessRoleService.findRoleAndMenu);

    router.route("/deleteRole").post(accessRoleService.deleteRole);

    router.route("/getLastRoleCode").get(accessRoleService.getLastRoleCode);

    router.route("/findRoleById").post(accessRoleService.getRoleById);

    router.route("/menu/getAll").get(accessRoleService.getMenu);

    router.route("/menu/fineMenuById").post(accessRoleService.getMenuAndRoleByMenuId);
    
    router.route("/menuRole/add").post(accessRoleService.addRoleAndMenu);

    router.route("/menuRole/update").post(accessRoleService.updateRoleAndMenu);
}