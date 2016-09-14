const router = require('koa-router')();
const models  = require('../models');

router.get('/',  function (ctx, next) {
  ctx.body = 'this a users response!';
});
router.post('/create', async (ctx, next) => {
  let body = ctx.request.body
  await models.User.create({
    username: body.username
  }).then(() => {
    ctx.redirect('/all');
    // ctx.body = user;
  });
});

router.get('/:user_id/destroy', async (ctx, res) => {
  await models.User.destroy({
    where: {
      id: ctx.params.user_id
    }
  }).then((user) => {
    ctx.redirect('/all');
  });
});

router.post('/:user_id/tasks/create', async (ctx, res) => {
  await models.Task.create({
    title: ctx.request.body.title,
    UserId: ctx.params.user_id
  }).then(() => {
    ctx.redirect('/all');
  });
});

router.get('/:user_id/tasks/:task_id/destroy', async (req, res) => {
  await models.Task.destroy({
    where: {
      id: ctx.params.task_id
    }
  }).then(() => {
    ctx.redirect('/all');
  });
});
module.exports = router;
