import express from "express"

import pkg from "pg"
const { Pool } = pkg

const app = express()

app.use(express.json())

app.get("/", async (req, res) => {
  //const response = await databaseQuery("select * from users")

  res.send("Welcome to my api")
})

const PORT = 3333

app.listen(PORT, () => {
  console.log(`Http server running at ${PORT}`)
})

// Conexão com a Base de Dados:

const pool = new Pool({
  user: "postgres",
  host: "host.docker.internal",
  database: "my_database",
  password: "password",
  port: "3001",
})

pool.on("error", (error) => {
  //console.log(error)
})

function databaseQuery(text, params) {
  return pool.query(text, params)
}
