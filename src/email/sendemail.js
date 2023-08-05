const nodemailer= require('nodemailer')


const sendEmail = async (args) =>{
  try{
    const transporter= nodemailer.createTransport({
       service: "hotmail",
   
      auth:{
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS
      }
    })
    await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: args.email,
      subject: args.subject,
      html: args.body
    })
    console.log ('Email Sent')
  }catch(e){
    console.log('cannot send email', e);
  }
}

module.exports={
  sendEmail
}
