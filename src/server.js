import express from "express"

const app = express()

app.get("/", async (req, res) => {
  //const response = await databaseQuery("select * from users")

  res.send("Hello world!!!")
})

app.get("/user", (req, res) => {
  return res.send("user's route")
})

app.get("/test", (req, res) => {
  return res.send("user's route")
})

const PORT = 3333

app.listen(PORT, () => {
  console.log(`Http server running at ${PORT}`)
})
/*
const { Pool } = require("pg")

// Conexão com a Base de Dados:

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "my_database",
  password: "password",
  port: "3001",
})

pool.on("connect", () => {
  console.log("Database successfully connected!")
})

pool.on("error", (error) => {
  console.log(error)

  throw new Error("Internal server error")
})

function databaseQuery(text, params) {
  return pool.query(text, params)
}
*/
