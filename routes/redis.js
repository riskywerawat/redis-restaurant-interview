// const indexController = require('../controllers/indexController');
const redisController = require('../controllers/redisController');
const express = require('express');
const router = express.Router();
const { inputValidate, timeValidate } = require('../utilities/validator')

router.post(
    '/getRedis',
    inputValidate(['host', 'port', 'key','timeout']),
    timeValidate,
     redisController.getRedis);
router.put(
    '/setRedis', 
    inputValidate(['host', 'port', 'key', 'value','timeout']),
    timeValidate,
    redisController.setRedis);
router.put(
    '/setRedisExpired',
    inputValidate(['host', 'port', 'key', 'value', 'expired','timeout']),
    timeValidate,
    redisController.setRedisExpired);
router.delete(
    '/deleteByKey', 
    inputValidate(['host', 'port', 'key','timeout']),
    timeValidate,
    redisController.deleteByKey);
router.delete(
    '/deleteAll', 
    inputValidate(['host', 'port','timeout']),
    timeValidate,
    redisController.deleteAll);
router.post(
    '/exists',
    inputValidate(['host', 'port', 'key','timeout']),
    timeValidate, 
    redisController.exists);

module.exports = router;
