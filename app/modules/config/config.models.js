const { db } = require('@cowellness/cw-micro-service')()
const configConstants = require('./config.constants')

const Schema = db.data.Schema

const newSchema = new Schema(
  {
    ownerId: {
      type: String
    },
    gateway: {
      type: String,
      enum: configConstants.gateways
    },
    settings: Object
  },
  { timestamps: true }
)

module.exports = db.data.model('Config', newSchema)
