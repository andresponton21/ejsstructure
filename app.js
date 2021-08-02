
// Import libraries
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

//render home page
router.get(`/`, function (req, res) {
	router.fLoadGrid(`ALL`, res)
})




router.get(`/:filterby`, function (req, res) {
	const filter = req.params.filterby
	router.fLoadGrid(filter, res)
})

router.fLoadGrid = function (filter, res) {
	let query = (filter != `ALL`) ? `SELECT * FROM tasks WHERE checked = ${filter} ORDER BY id ASC` : `SELECT * FROM tasks ORDER BY id ASC`

	dbConnection.query(query, (err, result) => {
		if (err) { throw err }
		res.render("index", { tasks: result })
	})
}

//render single task page
router.get(`/task/:id`, function (req, res) {
	const colorId = req.params.id
	const query = `SELECT * FROM tasks WHERE id = ${colorId} `

	dbConnection.query(query, (err, result) => {
		if (err) { throw err }
		res.render("task", {
			task: result[0]
		})
	})
})

router.post('/delete-task', function (req, res) {
	const query = `DELETE FROM tasks WHERE id = ${req.body.id}`

	dbConnection.query(query, (err, result) => {
		if (err) {
			throw err
		}
		res.writeHead(302)
		res.end()
	})
})

router.post(`/add-task-submit`, function (req, res) {
	const query = `INSERT INTO tasks (name, checked) VALUES ("${req.body.name}", 0)`

	dbConnection.query(query, (err, result) => {
		if (err) {
			throw err
		}
		res.writeHead(302, { Location: "/" })
		res.end()
	})
})

router.post(`/check-task`, function (req, res) {
	const query = `UPDATE tasks SET checked = "${req.body.checked}" WHERE id = ${req.body.id}`

	dbConnection.query(query, (err, result) => {
		if (err) {
			throw err
		}
		res.writeHead(302)
		res.end()
	})
})



router.post('/update-task-submit', function (req, res) {
	const query = `UPDATE tasks SET name = "${req.body.name}" WHERE id = ${req.body.id}`

	dbConnection.query(query, (err, result) => {
		if (err) {
			throw err
		}
		res.writeHead(302, { Location: "/" })
		res.end()
	})
})


app.use(`/`, router)
app.listen(config.serverPort, () => {
	console.log(`express server at 8080`)
})