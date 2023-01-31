const { ctr } = require('@cowellness/cw-micro-service')()

module.exports = async function (fastify, opts, done) {
  fastify.get('/pay/:orderId', async function (request, reply) {
    try {
      const checkoutUrl = await ctr.payment.payForOrder({ orderId: request.params.orderId })
      reply.redirect(301, checkoutUrl)
    } catch (e) {
      reply.cwsendFail({ data: e, message: e.message })
    }
  })

  fastify.get('/return/viva/', async function (request, reply) {
    try {
      const verificationDetail = await ctr.payment.verifyOrderPayment({ transactionId: request.query.s })
      reply.cwsendSuccess({ data: verificationDetail })
    } catch (e) {
      reply.cwsendFail({ data: e, message: e.message })
    }
  })
}
