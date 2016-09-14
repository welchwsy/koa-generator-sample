const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');

const index = require('./routes/index');
const users = require('./routes/users');

// var Sequelize = require('sequelize');
// var sequelize = new Sequelize('TestDataBase', 'postgres', '779361906', {
//   host: 'localhost',
//   dialect: 'postgres',
//   port: 5432,
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   }
// });
// sequelize
//   .authenticate()
//   .then(function(err) {
//     console.info('Connection has been established successfully.');
//   })
//   .catch(function (err) {
//     console.warn('Unable to connect to the database:', err);
//   });

// var User = sequelize.define('user', {
//   firstName: {
//     type: Sequelize.STRING
//   },
//   lastName: {
//     type: Sequelize.STRING
//   }
// });
// // force: true will drop the table if it already exists
// User.sync({force: false}).then(function () {
//   // Table created
//   return User.create({
//     firstName: 'John',
//     lastName: 'Hancock'
//   });
// });

// User.findOne().then(function(users) {
//   console.log(users.dataValues)
// })

// onerror
onerror(app);

// middlewares
app.use(bodyparser());
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'pug'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
router.use('/', index.routes(), index.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());

app.use(router.routes(), router.allowedMethods());
// response

app.on('error', function(err, ctx){
  console.log(err)
  logger.error('server error', err, ctx);
});


module.exports = app;