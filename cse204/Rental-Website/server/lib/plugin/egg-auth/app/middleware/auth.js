module.exports = options => {
  return async (ctx, next) => {
    const url = ctx.request.url;
    
    // Get token
    const token = ctx.request.token;
    // Use username to get token from redis
    const userToken = await ctx.app.redis.get(ctx.username);
    const user = userToken ? userToken === token : userToken;
    
    if (!user && !options.exclude.includes(ctx.request.url.split('?')[0])) {
      ctx.body = {
        status: 1001,
        errMsg: 'User do not login'
      };
    } else {
      await next();
    }
  }
}