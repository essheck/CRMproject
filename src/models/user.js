const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const History=require('./history')


const userSchema = new mongoose.Schema(
    {
        name: String,
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
        password:{
            type: String,
            required: true,
            trim: true,
            validate(value){
              if(value.toLowerCase().includes('password')){
                
                throw new Error('please enter a strong password')
              }
            }
          }
    }
)

userSchema.virtual('customers', {
    ref: 'Customer',
    localField: '_id',
    foreignField: 'owner'
  })

userSchema.virtual('history', {
    ref: 'History',
    localField: '_id',
    foreignField: 'user'
  })
  

  userSchema.statics.findByCredentials = async(email, password)=>{
    const user = await User.findOne({email})
    
    if(!user){
      throw new Error('Unable to login')
    }
  
    const isMatch= await bcrypt.compare(password, user.password)
  
    if(!isMatch){
      throw new Error('Unable to login')
    }
    
  
    return user
  }
  
  // hashing password
  userSchema.pre('save', async function(next){
    const user=this
    if(user.isModified('password')){
      user.password= await bcrypt.hash(user.password, 8)
    }
    next()
  })
  const User = mongoose.model('User', userSchema)
  
  module.exports= User