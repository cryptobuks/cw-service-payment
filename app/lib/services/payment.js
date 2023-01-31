const ServiceGatewayInstance = require('../vendorInstance')

class Payment extends ServiceGatewayInstance {
  constructor (config) {
    super(config)
    this.config = config
  }

  /**
   * - contract agreement for interface
   * @param {
   *  email - email of user
   *  amount - amount to be paid
   * }
   * @returns
   */
  make (params) {
    return this.getServiceInstance({
      serviceName: 'makePayment',
      params
    })
  }
}

module.exports = Payment
