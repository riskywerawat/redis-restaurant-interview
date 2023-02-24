const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const helmet = require('helmet')
const cors = require('cors')
const rateLimit = require("express-rate-limit");
const timeout = require('express-timeout-handler');

const redisRouter = require('./routes/redis');


const errorHandler = require('./middleware/errorHandler');



const app = express();


app.set('trust proxy',1);


const limiter = rateLimit({
    windowMs:  10 * 1000, // 10 second
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(cors());
app.use(timeout.handler({
    timeout: 10000,
    onTimeout: (req, res)=> {
        const resBody = {
            respCode: '101',
            respDesc: 'Connection fail',
            namespace: 'REDIS'
        }
        return res.status(400).send(resBody)
    }
}));
app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));
app.use(limiter);
app.use(helmet.frameguard({ action: 'SAMEORIGIN' }));

const promBundle = require("express-prom-bundle");
const metricsMiddleware = promBundle({includeMethod: true,includePath:
true,customLabels:{project_name:'redist-restaurant-interview'}});
app.use(metricsMiddleware);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.json());
app.use('/redis', redisRouter);

app.use(errorHandler);
module.exports = app;
