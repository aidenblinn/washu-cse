const Controller = require('egg').Controller;
const BaseController = require('./base');

class CommonsController extends BaseController {
  async citys() {
    const { ctx, app } = this;
    try {
      const result = await app.httpclient.request('http://ec2-3-138-107-71.us-east-2.compute.amazonaws.com/~yyz/citys.json', {
        dataType: 'json'
      });
      if (result.status === 200) {
        this.success(result.data.citys);
      } else {
        this.error('Failed');
      }
    } catch (error) {
      this.error('Failed');
    }
  }
}

module.exports = CommonsController;