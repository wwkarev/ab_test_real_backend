import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import configureRoutes from './src/routes'

dotenv.config()

const app: express.Application = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.set('Access-Control-Allow-Origin', '*')
    next()
})
configureRoutes(app)
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
})
