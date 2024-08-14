const Controller = require('egg').Controller;
const BaseController = require('./base');

class OrdersController extends BaseController {
  async hasOrder() {
    try {
      const { ctx, app } = this;
      console.log(ctx.userId, "11")
      console.log(ctx.params('id'), "22");
      const result = await ctx.service.orders.hasOrder({
        userId: ctx.userId,
        houseId: ctx.params('id')
      });
      console.log(result, '??==>')
      this.success(result);
    } catch(e) {
      console.log(e, "11");
    }
  }

  async addOrder() {
    const { ctx, app } = this;
    const result = await ctx.service.orders.addOrder({
      userId: ctx.userId,
      houseId: ctx.params('id'),
      isPayed: 0,
      createTime: ctx.helper.time()
    });

    this.success(result);
  }

  async delOrder() {
    const { ctx, app } = this;
    const result = await ctx.service.orders.delOrder(ctx.params('id'));

    this.success(result);
  }

  async lists() {
    const { ctx, app } = this;
    const result = await ctx.service.orders.lists({
      ...ctx.params(),
      userId: ctx.userId
    });

    this.success(result);
  }

  async invokePay(params) {
    return {
      orderNumber: params.id + new Date().getTime()
    }
  }

  async pay() {
    const { ctx, app } = this;
    const { id } = ctx.params();
    const order = await ctx.model.Orders.findByPk(id);

    if (order) {
      try {
        const beforePay = await this.invokePay({ id });
        const result = await ctx.service.orders.pay({
          id,
          orderNumber: beforePay.orderNumber
        });
        this.success(result);
      } catch (error) {
        this.error('Payment failed');
      }
    } else {
      this.error('Order do not exist');
    }
  }
}

module.exports = OrdersController;