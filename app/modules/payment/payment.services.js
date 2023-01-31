const { rabbitmq, ctr } = require('@cowellness/cw-micro-service')()

// TODO ADD SCHEMA VALIDATION
rabbitmq.consume('/payment/gateway/getUrlForPayment', (msg) => {
  const { gymId, email, amount } = msg.data
  return ctr.payment.getPaymentLink({ gymId, email, amount })
})

// TODO - to remove
rabbitmq.sendAndRead('/payment/gateway/getUrlForPayment', {
  gymId: '5fe4655ac123b10011000000',
  email: 'ogbiyoyosky@gmail.com',
  amount: 1000
})
