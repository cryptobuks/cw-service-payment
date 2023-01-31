const { db } = require('@cowellness/cw-micro-service')()

/**
 * @class ConfigController
 * @classdesc Controller Config
 */
class ConfigController {
  constructor () {
    this.Config = db.data.model('Config')
  }

  /**
   * getCofig - fetch config for a particular gym
   * @param {String} gymId - the id of the gym
   * @returns
   */
  async getConfig ({ gymId }) {
    const config = await this.Config.findOne({ ownerId: gymId })
    if (!config) return null
    return config
  }

  /**
   * Create a config
   * @param {Object} param
   */
  async create ({ gymId, gateway, settings }) {
    return await this.Config.create({ ownerId: gymId, gateway, settings })
  }

  /**
   * Create or Update a config
   * @param {Object} param
   */
  async setConfig ({ gymId, gateway, settings }) {
    const config = await this.Config.findOne({ ownerId: gymId })
    if (!config) {
      return await this.create({ gymId, gateway, settings })
    }
    Object.assign(config, { ownerId: gymId, gateway, settings })
    await config.save()
    return config
  }
}

module.exports = ConfigController
