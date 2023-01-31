const { db } = require('@cowellness/cw-micro-service')()

const Schema = db.data.Schema

const newSchema = new Schema(
  {
    name: {
      type: String
    }
  },
  { timestamps: true }
)

module.exports = db.data.model('Payment', newSchema)
