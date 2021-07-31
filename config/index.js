const config = {}


let environment = process.env.NODE_ENV.trim()
console.log(`environment==>`, environment)

config.serverPort = 8080
config.dbConfig = {
    user: "root",
    password: "root",
    host: "localhost",
    port: 3306,
    database: environment === "development" ? "nodejs" : "nodejs-prod"
}


console.log(`db name======>`, config.dbConfig.database)
module.exports = config