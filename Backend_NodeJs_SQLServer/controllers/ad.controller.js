const _adService = require("../services/ad.service");

module.exports = function (router) {
  const adService = _adService();

  router.route("/login").post(adService.authenticateAd);

  router.route("/findUserAd").post(adService.findUserAd);

};
