const timeout = require('connect-timeout');

const setupLimit = (app, express) => {


    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({
        limit: '50mb',
        extended: true
    }));

    app.use(timeout('300s'))
}

exports.setupLimit = setupLimit