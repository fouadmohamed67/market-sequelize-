const nodemailer=require('nodemailer')
const transport=nodemailer.createTransport({
    service:'gmail',
    auth:{
        
      user:'nodetest011@gmail.com',
      pass:'tgcyjydrhnajebbw'
    }
})
const sendMail=(to,subject,text)=>{

    transport.sendMail({
        to:to,
        from :'nodetest011@gmail.com',
        subject:subject,
        text:text  
    })  

}
 exports.sendMail=sendMail