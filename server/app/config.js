// PENANGANAN DOTENV YANG AKAN DIGUNAKAN

// Import Semua Dependensi yang diperlukan
const dotenv = require('dotenv');
const path = require('path');

// Menangani semua informasi dalam file .env
dotenv.config();

// Ekspor ke dalam konfigurasi database dalam file database/index.js
module.exports = {
    rootPath: path.resolve(__dirname, '..'),
    secretKey: process.env.SECRET_KEY,
    serviceName: process.env.SERVICE_NAME,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS,
    dbName: process.env.DB_NAME,
}