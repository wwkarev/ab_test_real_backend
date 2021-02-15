import { Sequelize } from 'sequelize'
import path from 'path'
import dotenv from 'dotenv'
import { UserActivityFactory } from './userActivity'
import { RetentionQueriesProfileFactory } from './retentionQueriesProfile'

dotenv.config()

// export const dbConfig = new Sequelize(`${process.env.DB}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)
export const dbConfig = new Sequelize({
    username: 'root',
    password: 'root',
    host: 'localhost',
    dialect: 'sqlite',
    storage: path.join('database.sqlite')
})
export const UserActivity = UserActivityFactory(dbConfig)
export const RetentionQueriesProfile = RetentionQueriesProfileFactory(dbConfig)

// UserActivity.sync({ alter: true })
// RetentionQueriesProfile.sync({ alter: true })
