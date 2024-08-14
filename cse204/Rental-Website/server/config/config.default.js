'use strict';
const path = require('path');


module.exports = appInfo => {
  const config = exports = {};

  config.keys = appInfo.name + '_1575812978932_7706';

  config.middleware = ['httpLog'];

  config.httpLog = {
    type: 'all'
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.view = {
    mapping: {
      ".html": "ejs"
    },
    root: [
      path.join(appInfo.baseDir, "app/html"),
      path.join(appInfo.baseDir, "app/view")
    ].join(",")
  };

  config.ejs = {
    delimiter: "%"
  };

  config.static = {
    prefix: "/assets/",
    dir: path.join(appInfo.baseDir, "app/assets")
  };

  config.session = {
    key: "MUKE_SESS",
    httpOnly: true,
    maxAge: 1000 * 5,
    renew: true
  };

  config.auth = {
    exclude: ['/api/user/login', '/api/user/register']
  };

  config.mysql = {
    app: true,
    agent: false,
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: '123456',
      database: 'egg'
    }
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'egg',
    define: {
      timestamps: false,
      freezeTableName: true
    }
  };

  config.jwt = {
    secret: 'muke'
  };

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0
    }
  };

  const userConfig = {
    salt: 'muke',
    redisExpire: 60 * 60 * 24
  };

  return {
    ...config,
    ...userConfig,
  };
};
