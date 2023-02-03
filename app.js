require('dotenv').config()

const express = require('express')
const app = express()
const port = 80
const  cors=require("cors")
const db=require("./databas/db")
db()
// For body pares
app.use(cors())
app.use(express.urlencoded())
app.use(express.json())

app.use('/api/auth',require("./routes/auth"))

app.get('/', (req, res) => {
  res.send(process.env.PRIVET_KEY)
})

app.listen(port, () => {
  console.log(`Example app ggg http://10.0.0.37:${port}`)
})