const path = require('path')
const basepath = path.join(__dirname, '..', 'app')

module.exports = {
  service: 'payment',
  fastify: { active: false, port: 3009, prefix: '/api/payment', sessionSecret: 'cw-micro-service-fastify-session-secret' },
  rabbitmq: { active: true, server: 'localhost:15672', user: 'dev', password: 'dev123' },
  redis: { active: false, server: 'localhost', port: 16379 },
  swagger: { active: false, exposeRoute: true },
  elasticSearch: { active: false, server: 'localhost:9200', timeout: 0, version: '7.6' },
  logger: { level: 'debug' },
  options: {
    vendors: {
      viva: {
        baseUrl: 'https://demo.vivapayments.com',
        getPaymentUrl: 'api/orders',
        verifyTransactionUrl: 'api/transactions',
        redirectUrl: '/payment/return/viva'
      }
    }
  },
  basepath,
  mongodb: {
    active: true,
    server: 'localhost',
    port: '37017',
    user: '',
    password: '',
    debug: true,
    databases: [
      {
        name: 'data',
        db: 'payment',
        options: {}
      }
    ]
  }
}
