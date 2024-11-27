const express = require('express'); 

function eRoutes() {
    const router = express.Router();
   
    var ad = require('./controllers/ad.controller')(router);
    var batch = require('./controllers/batch.controller')(router);
    var testdb = require('./controllers/testdb.controller')(router);
    var user = require('./controllers/user.controller')(router);
    var accessRole = require('./controllers/accessRole.controller')(router);
    var msater = require('./controllers/master.controller')(router);
    var cash = require('./controllers/cash.controller')(router);
    var cashConfirm = require('./controllers/cashConfirm.controller')(router);
    var report = require('./controllers/report.controller')(router);
    var file = require('./controllers/file.controller')(router);
    return router;
}

module.exports = eRoutes;