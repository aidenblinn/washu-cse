module.exports = options => {
  return async (ctx, next) => {
    const user = await ctx.service.user.getUser(ctx.username);
    if(!user){
      ctx.body = {
        status: 500,
        errMsg: 'User do not exist'
      };
      return;
    }else {
      await next();
    }
  }
}