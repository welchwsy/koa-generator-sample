const router = require('koa-router')();
const models  = require('../models');
router.get('/', async function (ctx, next) {
  ctx.state = {
    title: 'koa2 title'
  };

  await ctx.render('index', {
    message: "this is a message"
  });
})

router.get('all', async (ctx, next) => {

  await models.User.findAll({
    include: [ models.Task ]
  }).then(function(users) {
    console.log('users', users)
    ctx.body = users;
  });
});
module.exports = router;
