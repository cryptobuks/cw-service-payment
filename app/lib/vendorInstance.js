const vendors = require('./gateways/index')
const { _ } = require('@cowellness/cw-micro-service')()

class VendorInstance {
  constructor (config) {
    this.config = config
  }

  getServiceInstance ({
    serviceName,
    gateway,
    params
  }) {
    if (!gateway) {
      const activeVendor = _.get(this.config, 'settings.activeGateway')
      const vendorParams = _.get(this.config, `settings.${activeVendor}]`)
      const instance = new vendors[activeVendor](vendorParams)
      return instance[serviceName](params)
    } else {
      const activeVendor = gateway
      const vendorParams = _.get(this.config, `settings.${gateway}]`)
      const instance = new vendors[activeVendor](vendorParams)
      return instance[serviceName](params)
    }
  }
}

module.exports = VendorInstance
