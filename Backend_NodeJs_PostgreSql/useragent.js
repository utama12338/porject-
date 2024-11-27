const useragent = require("express-useragent");

const setupUseragent = (app) => {

    app.use(useragent.express());
}

exports.setupUseragent = setupUseragent