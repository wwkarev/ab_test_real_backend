"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivity = exports.dbConfig = void 0;
const sequelize_1 = require("sequelize");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const userActivity_1 = require("./userActivity");
dotenv_1.default.config();
// export const dbConfig = new Sequelize(`${process.env.DB}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)
exports.dbConfig = new sequelize_1.Sequelize({
    username: 'root',
    password: 'root',
    host: 'localhost',
    dialect: 'sqlite',
    storage: path_1.default.join('database.sqlite')
});
exports.UserActivity = userActivity_1.UserActivityFactory(exports.dbConfig);
exports.UserActivity.sync({ alter: true });
