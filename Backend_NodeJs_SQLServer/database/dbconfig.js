const dotenv = require('dotenv');
dotenv.config();

const config = {
    user: process.env.DB_USER, // sql user
    password: process.env.DB_PASS, //sql user password
    server: process.env.DB_SERVER, // if it does not work try- localhost
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT),
    options: {
        encrypt: false, // For Azure users
        trustServerCertificate: true, // This option allows self-signed certificates (for development purposes)
    
    }
}

module.exports = config;