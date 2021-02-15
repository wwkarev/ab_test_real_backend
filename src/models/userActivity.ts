import { BuildOptions, Model, DataTypes, Sequelize } from 'sequelize'

export interface UserActivityAttributes {
    id?: number;
    userId: number;
    registration: Date;
    lastActivity: Date;
}
export interface UserActivityModel extends Model<UserActivityAttributes>, UserActivityAttributes {}
export class UserActivity extends Model<UserActivityModel, UserActivityAttributes> {}
export type UserActivityStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): UserActivityModel;
}

export const UserActivityFactory = (sequelize: Sequelize): UserActivityStatic => {
    return <UserActivityStatic>sequelize.define('userActivity', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: true
        },
        registration: {
            type: DataTypes.DATE,
            allowNull: false
        },
        lastActivity: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'user_activity',
        underscored: true,
        timestamps: false
    })
}
