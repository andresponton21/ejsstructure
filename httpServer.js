const { read } = require("fs")
const http = require("http")

const server = http.createServer((req, res) => {

    if (req.url == `/`) {
        res.write(`Hello there`)
        res.end()
    }

    else if (req.url == `/test`) {

        res.write(`test`)
        res.end()
    }
})

server.listen(8080, () => {
    console.log(`Server running at 8080`)
})

