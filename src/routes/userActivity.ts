import express from 'express'
import { check, validationResult } from 'express-validator'
import { UserActivity } from '../models'
import { UserActivityModel } from '../models/userActivity'

const router = express.Router()

router.get('/', (req, res) => {
    return UserActivity.findAll().then(
        (userActivities: Array<UserActivityModel>) => {
            return res.json(userActivities)
        }
    ).catch(() => {
        res.status(500).send({ error: 'database error' })
    })
})

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

        return UserActivity.create({
            userId: req.body.userId,
            registration: req.body.registration,
            lastActivity: req.body.lastActivity
        }).then(() => {
            return res.send('UserActivity is created')
        }).catch(() => {
            return res.status(500).send({ error: 'database error' })
        })
    }
)

export default router
