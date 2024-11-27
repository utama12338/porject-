const _testdbService = require("../services/testdb.service");

module.exports = function (router) {
  const testdbService = _testdbService();
  
  router.route("/testconnectdb").get(testdbService.testConnect);

};
