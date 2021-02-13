import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
import { UserActivityFactory } from './userActivity'

dotenv.config()

export const dbConfig = new Sequelize(`${process.env.DB}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)

export const UserActivity = UserActivityFactory(dbConfig)
UserActivity.sync({ alter: true })
