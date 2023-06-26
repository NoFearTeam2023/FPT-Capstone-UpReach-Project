//config for database
const config = {
    user: 'sa',
    password: '123456',
    server: '26.208.54.35',
    database: 'UpReachDB',
    options: {
        encrypt: true,
        trustedconnection: true,
        enableArithAort: true,
        trustServerCertificate: true,
        instancename: 'SQLEXPRESS'
    },
    port: 1433,
}

module.exports = config
