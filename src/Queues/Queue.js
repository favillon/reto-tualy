const Queue = require('bull')
//const nodemailer = require("nodemailer")
const { exec } = require('child_process');

const Service = require('../models/service.model')
const Product = require('../models/product.model')
const User = require('../models/user.model')


const servicioQueue = new Queue('servicio',
    {
        redis: {
            host: process.env.HOST_REDIS,
            port: process.env.REDIS_PORT,
            db: 0
        }
});


servicioQueue.process(async(job, done)=>{
    try {
        console.log(job.data);
        const {service} = job.data
        const servicio = await Service.findAll({
            where:{
                id : service,
                status: true
            }
        });

        if(!servicio[0]) {
            console.log(servicio);
            throw new Error(`Servivio ya fue atendido o no existe : ${service}`)
        }
        const userId = servicio[0].user_id

        const existUser = await User.findOne({
            where:{
                status : true,
                id: userId
            }
        })
        if(!existUser) {
            console.log(userId);
            throw new Error(`Usuario inactivo o no existe : ${userId}`)
        }
        const products = servicio[0].products

        let totalaService = 0

        for (let index = 0; index < products.length; index++) {
            const p = products[index];
            const prod = await Product.findOne({
                where:{
                    status : true,
                    id: p.id
                }
            })
            totalaService+= (prod.price * p.qty)
        }
        console.log(totalaService);
        console.log({service, email :existUser.email, totalaService})
        sendEmailCurl({service, email : existUser.email, totalaService})
        //sendEmailNodeEmail({service, email : existUser.email, totalaService})

        done(null, job.data)
    } catch (error) {
        console.log(error);
        done(error)
    }
    
})


const sendEmailCurl = async({service, email, totalaService}) => {
    
    exec(`node src/bash/nodemailer.js  ${email} ${service} ${totalaService}  `, (err, stdout, stderr) => {
        if (err) {
            console.error(err)
        } else {            
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        }
    })
}
const sendEmailNodeEmail  = async({service, email, totalaService}) => {

    const objEmail = {
        from: '"From  👻" <form@example.com>', // sender address
        to: `${email}`, // list of receivers
        subject: "Subject : Queue Reto tualy ✔", // Subject line
        text: "Texto : Queue Reto tualy", // plain text body
        html: `
            <h1>Hello world?</h1>
            <p>Services : ${service}</p>
            <p>TotalServices : ${totalaService}</p>
        `, // html body
    }
    console.warn(objEmail)

    console.warn("email")
    let testAccount = await nodemailer.createTestAccount();
    console.warn("email2")
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
        tls : {
            rejectUnauthorized : false
        }
    });    
   
    // send mail with defined transport object
    let info = await transporter.sendMail(objEmail);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

const validService = (job) => {
    
    servicioQueue.add(job,{
        delay : 2000
    })
}
module.exports ={
    validService
}