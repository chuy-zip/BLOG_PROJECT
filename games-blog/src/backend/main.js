import express from 'express'
import cors from 'cors'

const app = express()
const port = 3000


app.use(express.json())
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}))



app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})