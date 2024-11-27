const cors = require("cors");

const setupCors = (app) => {

    const corsOptions = {
        origin: "*"
    };

    app.use(cors(corsOptions));
}

exports.setupCors = setupCors