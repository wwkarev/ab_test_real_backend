"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userActivity_1 = __importDefault(require("./userActivity"));
const configureRoutes = (app) => {
    app.use('/user_activity', userActivity_1.default);
};
exports.default = configureRoutes;
