const mongoose= require('mongoose')
const validator= require('validator')
const History=require('./history')


const customerSchema= new mongoose.Schema({
  name:{
    type: String,
    required: true,
    trim: true,
  },
  email:{
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate(value){
      if(!validator.isEmail(value)){
        
        throw new Error('Please enter a valid Email')
      }
    }
  },
  phone:{
    type: Number,
    unique: true,
    required: true,
    trim: true,
  },
  address:{
    type: String,
    unique: true,
    required: true,
  },
  gst: {
    type: String,
    unique: true,
    required: true,
  },
  stage: {
    type: Number,
    default: 1,
    required: true,
  },
  estimatedsales: {
    type: Number,
    },
  sales: {
        type: Number,
    },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
},{
  timestamps: true
})

customerSchema.virtual('history', {
  ref: 'History',
  localField: '_id',
  foreignField: 'customer'
})

const Customer= mongoose.model('Customer', customerSchema)

module.exports= Customer