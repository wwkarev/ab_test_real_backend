"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const models_1 = require("../models");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    return models_1.UserActivity.findAll().then((userActivities) => {
        return res.json(userActivities);
    }).catch(() => {
        res.status(500).send({ error: 'database error' });
    });
});
router.post('/', [
    express_validator_1.check('userId').isInt().withMessage('userId must be a Int'),
    express_validator_1.check('registration')
        .not().isEmpty().withMessage('registration is required')
        .isDate().withMessage('registration must be a Date')
        .toDate(),
    express_validator_1.check('lastActivity')
        .not().isEmpty().withMessage('lastActivity is required')
        .isDate().withMessage('lastActivity must be a Date')
        .toDate()
        .custom((lastActivity, { req }) => {
        const registration = req.body.registration;
        return lastActivity >= registration;
    }).withMessage('lastActivity must be less than registration')
], (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).jsonp(errors.array());
    }
    return models_1.UserActivity.create({
        userId: req.body.userId,
        registration: req.body.registration,
        lastActivity: req.body.lastActivity
    }).then(() => {
        return res.send('UserActivity is created');
    }).catch(() => {
        return res.status(500).send({ error: 'database error' });
    });
});
exports.default = router;
