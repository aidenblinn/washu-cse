module.exports = options => {
  return async (ctx, next) => {
    const flag = ctx.app.router.stack.filter(item => {
      return item.regexp.test(ctx.request.url);
    });

    if(flag.length){
      await next();
    }else {
      ctx.body = {
        status: 404,
        errMsg: 'Interface ' + ctx.request.url + ' do not exist'
      };
    }
  }
}