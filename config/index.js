const config = {}

console.log(`Environment----->`, process.env.NODE_ENV)

config.serverPort = 8080
config.dbConfig = {
    user: "root",
    password: "root",
    host: "localhost",
    port: 3306,
    database: "nodejs"
}

module.exports = config