import express from 'express'
import { check, validationResult } from 'express-validator'
import {
    createUserActivity,
    getUserActivities,
    generateUserActivities,
    calculateRollingRetention
} from '../controllers/userActivity'

const MAX_RECORDS_ON_GENERATE = 10000
const router = express.Router()

router.get(
    '/',
    [
        check('offset')
            .not().isEmpty().withMessage('offset is required')
            .isInt({ min: 0 }).withMessage('offset must be int >= 0'),
        check('limit')
            .not().isEmpty().withMessage('limit is required')
            .isInt({ min: 1 }).withMessage('limit must be int >= 1')
    ],
    (req: any, res: any) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).jsonp(errors.array())
        }

        return getUserActivities(req.query.offset, req.query.limit)
            .then(info => res.json(info))
            .catch(() => res.status(500).send({ error: 'database error' }))
    }
)

router.post(
    '/',
    [
        check('userId').isInt().withMessage('userId must be a Int'),
        check('registration')
            .not().isEmpty().withMessage('registration is required')
            .isDate().withMessage('registration must be a Date')
            .toDate(),
        check('lastActivity')
            .not().isEmpty().withMessage('lastActivity is required')
            .isDate().withMessage('lastActivity must be a Date')
            .toDate()
            .custom((lastActivity: Date, { req }) => {
                const registration: Date = req.body.registration
                return lastActivity >= registration
            }).withMessage('lastActivity must be less than registration')
    ],
    (req: any, res: any) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).jsonp(errors.array())
        }

        return createUserActivity(req.body.userId, req.body.registration, req.body.lastActivity)
            .then(() => res.send('UserActivity is created'))
            .catch((error) => res.status(500).send(error))
    }
)

router.get(
    '/rolling_retention',
    [
        check('ndays')
            .not().isEmpty().withMessage('ndays is required')
            .isInt({ min: 1 }).withMessage('ndays must be int > 0')
    ],
    (req: any, res: any) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).jsonp(errors.array())
        }

        return calculateRollingRetention(req.query.ndays)
            .then(rollingRetention => res.json(rollingRetention))
            .catch((error) => res.status(500).send(error))
    }
)

router.post(
    '/generate_records',
    [
        check('quantity')
            .not().isEmpty().withMessage('quantity is required')
            .isInt({ min: 1, max: MAX_RECORDS_ON_GENERATE }).withMessage(`quantity must be int > 1, < ${MAX_RECORDS_ON_GENERATE}`)
    ],
    (req: any, res: any) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).jsonp(errors.array())
        }

        return generateUserActivities(req.body.quantity)
            .then(() => res.send('UserActivities is created'))
            .catch((error) => res.status(500).send(error))
    }
)

export default router
