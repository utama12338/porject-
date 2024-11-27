/*!
 * @PutthamawadeeS@gsb.or.th
 */

const express = require('express');
const router = require('./routes')();
const app = express();
const { setupLogging } = require("./logging");
const { setupUseragent } = require('./useragent');
const { setupCors } = require('./cors');
const { setupLimit } = require('./limit');


const port = process.env.port || 80

setupCors(app);
setupUseragent(app);
setupLogging(app);
setupLimit(app, express);

app.listen(port, () => {
    console.log("Hi This port is running " + port)

});


app.use('/spgv-cain-api', router);

app.get('/spgv-cain-api', function (req, res) {
    res.send('<h1>Welcome To SPGV-CAIN-API Server!</h1>');
})

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
process.on('uncaughtException', function (err) {
    console.error("uncaughtException", err);
    console.log("Node NOT Exiting...");
});
process.on('warning', (warning) => {
    // console.error('warning', warning);
    if (!warning.message.includes("Buffer() is deprecated")) {
        console.error(warning);
    }
});