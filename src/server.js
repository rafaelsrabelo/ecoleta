const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db")


//configurar pasta publica
server.use(express.static("public"))


// utilizando template engine 
const nunjuscks = require("nunjucks")
nunjuscks.configure("src/views", {
  express: server,
  noCache: true
})
  

// configurar caminhos da minha app

// pagina inicial
// req requisicao res resposta 
server.get("/", (req, res) => {
  return res.render("index.html", { title: "Um título"})
})

server.get("/create-point", (req, res) => {

  // req.query: Query.Strings da nossa url
  console.log(req.query)

  return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
  return res.send("ok")
})

server.get("/search", (req, res) => {

  // pegar os dados do banco de dados
    db.all(`SELECT * FROM places`, function (err, rows) {
      if (err) {
        return console.log(err)
      }

      const total = rows.length

      console.log("Aqui estão seus registros!")
      console.log(rows)

      // mostrar a pagian html com os dados do db
      return res.render("search-results.html", { places: rows, total: total})

    })
})

// ligar o servidor 
server.listen(3000)