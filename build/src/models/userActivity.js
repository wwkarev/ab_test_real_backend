"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivityFactory = exports.UserActivity = void 0;
const sequelize_1 = require("sequelize");
class UserActivity extends sequelize_1.Model {
}
exports.UserActivity = UserActivity;
function UserActivityFactory(sequelize) {
    return sequelize.define('userActivity', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: sequelize_1.DataTypes.BIGINT,
            allowNull: false,
            unique: true
        },
        registration: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        },
        lastActivity: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'user_activity',
        underscored: true,
        timestamps: false
    });
}
exports.UserActivityFactory = UserActivityFactory;
