const ServiceGatewayInstance = require('../vendorInstance')

class VerifyPayment extends ServiceGatewayInstance {
  constructor (config) {
    super(config)
    this.config = config
  }

  /**
   *  Verify  transaction
   * @param {Object} params
   * @returns
   */
  verify (params, gateway = null) {
    return this.getServiceInstance({
      serviceName: 'verifyPayment',
      params,
      gateway
    })
  }
}

module.exports = VerifyPayment
