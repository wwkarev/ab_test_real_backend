import { BuildOptions, Model, DataTypes, Sequelize } from 'sequelize'

export interface RetentionQueriesProfileAttributes {
    id?: number;
    returned: number;
    installed: number;
    nDays: number;
}
export interface RetentionQueriesProfileModel extends Model<RetentionQueriesProfileAttributes>, RetentionQueriesProfileAttributes {}
export class RetentionQueriesProfile extends Model<RetentionQueriesProfileModel, RetentionQueriesProfileAttributes> {}
export type RetentionQueriesProfileStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): RetentionQueriesProfileModel;
}

export const RetentionQueriesProfileFactory = (sequelize: Sequelize): RetentionQueriesProfileStatic => {
    return <RetentionQueriesProfileStatic>sequelize.define('userActivity', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        returned: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        installed: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        nDays: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'retention_queries_profile',
        underscored: true,
        timestamps: false
    })
}
