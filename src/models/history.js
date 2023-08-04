const mongoose= require('mongoose')
const validator= require('validator')

const historySchema= new mongoose.Schema({
  subject:{
    type: String,
    required: true,
  },
  desc:{
    type: String,
    reuired: true,
  },
  time:{
    type: Date,
    reuqired: true,
    default: Date.now(),
  },
  customer:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Customer'
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
})


const History= mongoose.model('History', historySchema)

module.exports= History
