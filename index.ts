import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import configureRoutes from './src/routes'

dotenv.config()

const app: express.Application = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

configureRoutes(app)
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
})
