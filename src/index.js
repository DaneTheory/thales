require('express-mongoose');

import DefaultAppConfig from '../DefaultAppConfig'; // eslint-disable-line import/first
import service from './Config/Express'; // eslint-disable-line import/first
import Mongoose from './Config/Mongoose'; // eslint-disable-line import/first


const config = DefaultAppConfig();
const debug = require('debug')(`${config.get('name')}:index`); // eslint-disable-line no-unused-vars

const mongooseInst = () => Mongoose(config);

Promise = require('bluebird'); // eslint-disable-line no-global-assign

mongooseInst();


export default service;
