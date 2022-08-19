import express from "express"

import pkg from "pg"
const { Pool } = pkg

const app = express()

app.use(express.json())

app.get("/", async (req, res) => {
  //const response = await databaseQuery("select * from users")

  res.send("Welcome to my api")
})
//C - create
app.post("/user/create", async (req, res) => {
  const { name } = req.body

  if (!name) {
    return res.status(422).json("The email is required")
  }

  const id = new Date().getTime()

  try {
    const dbResponse = await databaseQuery(
      `INSERT INTO users ("id", "name") values ($1, $2)`,
      [id, name]
    )

    const data = dbResponse.rows

    return res.status(201).json({ error: false, data })
  } catch (error) {
    return res.status(500).json({ error: true, msg: "Unexpected error" })
  }
})

// R - read

app.get("/user/read", async (req, res) => {
  try {
    const dbResponse = await databaseQuery("select * from users")
    const data = dbResponse.rows

    return res.status(200).json({ error: false, data })
  } catch (error) {
    return res.status(500).json({ error: true, msg: "Unexpected error" })
  }
})

// U - update

app.put("/user/update/", async (req, res) => {
  const { user_id, name } = req.body

  if (!user_id) {
    return res.status(422).json({ error: true, msg: "The user id is required" })
  }

  if (!name) {
    return res.status(422).json({ error: true, msg: "The name is required" })
  }

  try {
    const userFound = await databaseQuery("SELECT * FROM users WHERE id = $1", [
      user_id,
    ])

    if (userFound.rows.length == 0) {
      return res.status(404).json({ erro: true, msg: "User not found" })
    }

    const dbResponse = await databaseQuery(
      "UPDATE users SET name = $1 where id = $2",
      [name, user_id]
    )

    const data = dbResponse.rows

    return res.status(200).json({ error: false, data })
  } catch (error) {
    return res.status(500).json({ error: true, msg: "Unexpected error" })
  }
})

// D - delete

app.delete("/user/delete", async (req, res) => {
  const { user_id } = req.body

  if (!user_id) {
    return res.status(422).json({ error: true, msg: "The user id is required" })
  }

  try {
    const userFound = await databaseQuery("SELECT * FROM users WHERE id = $1", [
      user_id,
    ])

    if (userFound.rows.length <= 0) {
      return res.status(404).json({ error: true, msg: "User not found" })
    }
    const dbResponse = await databaseQuery("DELETE FROM users WHERE id = $1", [
      user_id,
    ])

    const data = dbResponse.rows

    return res.status(200).json({ error: false, data })
  } catch (error) {
    return res.status(500).json({ error: true, msg: "Unexpected error" })
  }
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
