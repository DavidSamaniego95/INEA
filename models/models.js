const mongoose = require('mongoose');
const _ = require('underscore');
const config = require('../_config');
mongoose.set('debug', true);    //watch all queries to mongo
module.exports = (wagner) => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/' + config.dbName);
    wagner.factory('db', () => mongoose);
    const User = require('./user.model.js');
    const HojaU = require('./hojaU.model.js');
    const models = {
        User ,
        HojaU
    };
    _.each(models, (v, k) => {
      wagner.factory(k, () => v);
    });
  };