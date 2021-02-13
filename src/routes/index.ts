import express from 'express'
import userActivity from './userActivity'

const configureRoutes = (app: express.Application) => {
    app.use('/user_activity', userActivity)
}

export default configureRoutes
