const { ctr } = require('@cowellness/cw-micro-service')()

/**
 * @class ConfigActions
 * @classdesc Actions Category
 */
class ConfigActions {
  /**
   *  get config
   * @param {*} data
   * @param {*} reply
   * @returns
   */
  async getConfig (data, reply) {
    const config = await ctr.config.getConfig(data)

    if (!config) {
      return reply.cwSendFail({
        message: 'No config set for the gym'
      })
    }

    return reply.cwSendSuccess({
      data: {
        config
      }
    })
  }

  /**
   * set config
   * @param {*} data
   * @param {*} reply
   */
  async setConfig (data, reply) {
    try {
      const config = await ctr.config.setConfig(data)

      reply.cwSendSuccess({
        message: 'Config have been save successfully',
        _message: '_responses.saved_successfully',
        data: {
          config
        }
      })
    } catch (error) {
      reply.cwSendFail({
        message: error.message,
        _message: error._message ? error._message : null
      })
    }
  }
}

module.exports = ConfigActions
