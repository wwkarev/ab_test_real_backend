import { RetentionQueriesProfile, UserActivity } from '../models'
import moment from 'moment'
import { randomDateInInterval } from '../util'
import { Op, Sequelize } from 'sequelize'

export const createUserActivity = async (userId: number, registration: Date, lastActivity: Date) => {
    return UserActivity.create({
        userId: userId,
        registration: registration,
        lastActivity: lastActivity
    })
}

export const getUserActivities = async (offset: number, limit: number) => {
    console.log('offset', offset, limit)
    return UserActivity.findAndCountAll({
        offset: offset,
        order: [
            ['lastActivity', 'DESC']
        ],
        limit: limit
    })
}

export const getMaxUserId = async (): Promise<number> => {
    return UserActivity.findAll({
        attributes: [
            [Sequelize.fn('MAX', Sequelize.col('user_id')), 'maxUserId']
        ]
    }).then((res) => {
        return (res[0] as any).getDataValue('maxUserId')
    })
}

export const generateUserActivities = async (quantity: number) => {
    const maxUserId = await getMaxUserId()
    const startUserId = maxUserId + 1
    const endDate = new Date()
    const startDate = moment(endDate).subtract(180, 'days').toDate()

    for (let currentUserId = startUserId; currentUserId < startUserId + quantity; currentUserId++) {
        const registration = randomDateInInterval(startDate, endDate)
        const lastActivity = randomDateInInterval(registration, endDate)
        await createUserActivity(currentUserId, registration, lastActivity).then()
    }

    return Promise.resolve()
}

export const calculateReturnedQuantity = async (nDays: number): Promise<number> => {
    return UserActivity.findAll({
        where: {
            lastActivity: {
                [Op.gte]: Sequelize.fn('DATE', Sequelize.col('registration'), `+${nDays} day`)
            }
        },
        attributes: [
            [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
        ]
    }).then((res) => {
        return (res[0] as any).getDataValue('count')
    })
}

export const calculateInstalledQuantity = async (nDays: number): Promise<number> => {
    return UserActivity.findAll({
        where: {
            registration: {
                [Op.lte]: Sequelize.fn('DATE', 'now', `-${nDays} day`)
            }
        },
        attributes: [
            [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
        ]
    }).then((res) => {
        return (res[0] as any).getDataValue('count')
    })
}

export const calculateRollingRetention = async (nDays: number): Promise<number> => {
    const startTimeReturned = new Date().getTime()
    const returnedQuantity = await calculateReturnedQuantity(nDays)
    const timeReturned = new Date().getTime() - startTimeReturned

    const startTimeInstalled = new Date().getTime()
    const installedQuantity = await calculateInstalledQuantity(nDays)
    const timeInstalled = new Date().getTime() - startTimeInstalled

    if (installedQuantity === 0) {
        throw new Error('Cannot calculate rolling retention. Division by zero.')
    }

    await RetentionQueriesProfile.create({ returned: timeReturned, installed: timeInstalled, nDays })

    return Promise.resolve(returnedQuantity / installedQuantity)
}
