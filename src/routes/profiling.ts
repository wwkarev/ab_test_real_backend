import express from 'express'
import { validationResult } from 'express-validator'
import { RetentionQueriesProfile } from '../models'

const router = express.Router()

router.get(
    '/retention',
    [],
    (req: any, res: any) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).jsonp(errors.array())
        }

        return RetentionQueriesProfile.findAll()
            .then(info => {
                res.json(info)
            })
            .catch(() => res.status(400).send('database error'))
    }
)
export default router
