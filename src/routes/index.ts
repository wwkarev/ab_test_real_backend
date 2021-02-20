import express from 'express'
import userActivity from './userActivity'
import profiling from './profiling'
import dotenv from 'dotenv'

dotenv.config()

const configureRoutes = (app: express.Application) => {
    app.use(`${process.env.PREFIX_URL}/user_activity`, userActivity)
    app.use(`${process.env.PREFIX_URL}/profiling`, profiling)
}

export default configureRoutes
