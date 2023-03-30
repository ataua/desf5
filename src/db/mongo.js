const mongoose = require('mongoose')

const connect = async () => {
  try {
    const uri = 'mongodb://0.0.0.0:27017/desf5'
    return await mongoose.connect(
      uri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = connect
