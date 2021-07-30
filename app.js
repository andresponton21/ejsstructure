const express = require("express")
const path = require("path")
const app = express()
const router = express.Router()
const bodyParser = require("body-parser")
const mysql = require("mysql")
const config = require("./config")


app.use(express.static("public"))
// Use ejs as a view engine
app.set("view engine", "ejs")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// const bdConnection = mysql.createConnection(config.dbConfig)
// bdConnection.connect((err) => {
//     if (err) {
//         throw err
//     }

//     console.log(`Connected to DB`)
// })

//render index.ejs
router.get(`/`, function (req, res) {
    res.render("index")
})

app.use(`/`, router)
app.listen(config.serverPort, () => {
    console.log(`express server at 8080`)
})