/*
import { Pool } from "pg"

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

export function databaseQuery(text, params) {
  return pool.query(text, params)
}
*/
