const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL)
  .then(res => console.log('connected to DB'))
  .catch(err => console.log(err))
