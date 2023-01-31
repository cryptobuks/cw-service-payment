const { gateways } = require('./config.constants')

module.exports = {
  getConfig: {
    schema: {
      summary: 'Get a gym payment gatway config',
      security: [
        {
          authorization: []
        }
      ],
      body: {
        type: 'object',
        required: ['gymId'],
        properties: {
          gymId: {
            type: 'string',
            description: 'Profile of gym'
          }
        }
      }
    }
  },
  setConfig: {
    schema: {
      summary: 'Set a gym payment gatway config',
      security: [
        {
          authorization: []
        }
      ],
      body: {
        type: 'object',
        required: ['gymId', 'gateway', 'settings'],
        properties: {
          gymId: {
            type: 'string',
            description: 'Profile of gym'
          },
          gateway: {
            type: 'string',
            enum: gateways,
            description: 'Profile of gym'
          },
          settings: {
            type: 'object',
            required: ['activeGateway'],
            properties: {
              activeGateway: {
                type: 'string',
                enum: gateways,
                description: 'Active gateway'
              }
            }
          }
        }
      }
    }
  }
}
