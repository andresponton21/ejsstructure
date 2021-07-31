const express = require("express")
const path = require("path")
const app = express()
const router = express.Router()
const bodyParser = require("body-parser")
const mysql = require("mysql")
const config = require("./config")
require('dotenv').config()



app.use(express.static("public"))
// Use ejs as a view engine
app.set("view engine", "ejs")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


const dbConnection = mysql.createConnection(config.dbConfig)
dbConnection.connect((err) => {
	if (err) {
		throw err
	}

	console.log(`Connected to DB`)
})

//render index.ejs
router.get(`/`, function (req, res) {
	const query = `SELECT * FROM colors ORDER BY id ASC`


	dbConnection.query(query, (err, result) => {
		console.log(`result`, result)

		if (err) { throw err }

		res.render("index", { colors: result })
	})


})


router.get(`/color/:id`, function (req, res) {

	const colorId = req.params.id
	console.log(`parameters`, colorId)
	const query = `SELECT * FROM colors WHERE id = ${colorId} `

	dbConnection.query(query, (err, result) => {
		console.log(`result`, result)

		if (err) { throw err }

		res.render("color", {
			color: result[0]
		})
	})




})

app.use(`/`, router)
app.listen(config.serverPort, () => {
	console.log(`express server at 8080`)
})