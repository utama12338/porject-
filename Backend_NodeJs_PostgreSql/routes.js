const express = require('express');

function eRoutes() {
    const router = express.Router();
    var webService = require('./web_service/webService.routes')(router);
    var ccps = require('./repository/ccps/ccps.routes')(router);
    var register = require('./repository/register/register.routes')(router);
    var webapp =require('./repository/webapp/webapp.routes')(router);
    return router;
}

module.exports = eRoutes;