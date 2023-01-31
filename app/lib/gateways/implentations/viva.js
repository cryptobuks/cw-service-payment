const axios = require('axios')
const config = require('config')
const { log } = require('@cowellness/cw-micro-service')()

const vivaConfiguration = config.get('options.vendors.viva')

class Viva {
  constructor (setting) {
    this.config = setting
    if (!this.config.apiKey || !this.config.merchantId) {
      log.error('Viva Wallet: config.settings.viva.merchantId and config.settings.viva.apiKey are not set')
    }

    this.api = axios.create({
      auth: {
        username: this.config.merchantId,
        password: this.config.apiKey
      }
    })
  }

  /**
   *
   * @param {Object} param
   * @returns Promise<Object> - contains checkout url
   */
  async makePayment ({ amount, email }) {
    try {
      const payload = {
        email,
        amount
      }

      const { data } = await this.api.post(`${vivaConfiguration.baseUrl}/${vivaConfiguration.getPaymentUrl}`, payload)

      return {
        merchantLog: data,
        reference: data.OrderCode,
        activeProvider: 'viva',
        success: true,
        checkoutUrl: `${vivaConfiguration.baseUrl}/web/checkout?ref=${data.OrderCode}`
      }
    } catch (error) {
      log.info('Error from gate way')
      log.info({
        payload: error.config.data,
        data: error.response.data
      })
      return Promise.reject(new Error(error.response.data.Message))
    }
  }

  /**
   *
   * @param {
   *  transactionId - the id of the transaction
   * }
   * @returns
   */
  async verifyPayment ({ transactionId }) {
    try {
      log.error(`Verifying transaction with order code ${transactionId}`)
      const { data } = await this.api.get(`${vivaConfiguration.baseUrl}/${vivaConfiguration.verifyTransactionUrl}/?ordercode=${transactionId}`)

      if (data.Transactions.length === 0) {
        return {
          merchantLog: data,
          transactionId: transactionId,
          activeProvider: 'viva',
          success: false,
          message: 'Transaction not found',
          transactionDetail: {}
        }
      } else {
        return {
          merchantLog: data,
          transactionId: transactionId,
          activeProvider: 'viva',
          message: 'Successfully found transaction',
          transactionDetail: {
            amount: data.Transactions[0].Amount,
            reference: data.Transactions[0].TransactionId,
            status: data.Transactions[0].StatusId === 'F',
            transactionId: transactionId
          }
        }
      }
    } catch (error) {
      log.info('Error from gate way')
      log.info({
        payload: error.config.data,
        data: error.response.data
      })
      return Promise.reject(new Error(error.response.data.Message))
    }
  }
}

module.exports = Viva
