const mongoose = require('mongoose')

const connect = async () => {
  const uri = 'mongodb://0.0.0.0:27017/desf5'
  return await mongoose.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
}

module.exports = connect
