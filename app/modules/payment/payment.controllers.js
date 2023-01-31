const { db, ctr } = require('@cowellness/cw-micro-service')()
const Payment = require('../../lib/services/payment')
const VerifyPayment = require('../../lib/services/verifyPayment')

/**
 * @class PaymentController
 * @classdesc Controller Payment
 */
class PaymentController {
  constructor () {
    this.Payment = db.data.model('Payment')
  }

  /**
   * getPaymentLink - get payment link
   * @param {Object} param
   * @returns
   */
  async getPaymentLink ({ gymId, email, amount }) {
    const config = await ctr.config.getConfig({ gymId })
    const paymentLink = await new Payment(config).make({ email, amount })
    return paymentLink
  }

  /**
   * verifyTransaction - verify the transaction
   * @param {Object} param
   * @returns
   */
  async verifyTransaction ({ gymId, data, gateway }) {
    const config = await ctr.config.getConfig({ gymId })
    const verifyDetail = await new VerifyPayment(config).verify(data, gateway)
    return verifyDetail
  }

  /*
   * ProcessOrderPayment
   * @param {Pay} param0
   */
  async payForOrder ({ orderId }) {
    // Todo- validate the order on the shop service
    // Todo- replace static data
    const data = {
      gymId: '5fe4655ac123b10011000000',
      email: 'ogbiyoyosky@gmail.com',
      amount: 1000
    }
    const paymentLinkDetails = await this.getPaymentLink(data)
    // Todo update status of the order
    // Todo update the transaction with the orderId from gateWay generated
    return paymentLinkDetails.checkoutUrl
  }

  /*
   * verifyOrderPayment
   * @param {Pay} param0
   */
  async verifyOrderPayment ({ transactionId }) {
    // TODO - Validate the order
    // TODO - GET the gatewate used for the initial transaction service shop
    // REMOVE - Static gateway
    const gymId = '5fe4655ac123b10011000000'
    const gateway = 'viva'
    const verificationDetails = await this.verifyTransaction({ gymId, data: { transactionId }, gateway })

    // Todo update status of the order
    // Todo update the transaction with the orderId from gateWay generated
    return verificationDetails
  }
}

module.exports = PaymentController
