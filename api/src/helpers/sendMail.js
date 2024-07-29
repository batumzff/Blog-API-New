"use strict"

const nodemailer = require("nodemailer")

module.exports = function (to, subject, message) {

// //? YandexMail (yandex):
// const transporter = nodemailer.createTransport({
//     service: 'Yandex',
//     auth: {
//         user: 'username@yandex.com',
//         pass: 'password' // your emailPassword
//     }
// })

// ! Google Mail(gmail)

// //* Google -> AccountHome -> Security -> Two-Step-Verify -> App-Passwords

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user:"yalnizgarip1i@gmail.com",
        pass: "drrb yspy olub mtpz"
    }
})

transporter.sendMail({
    
    // to:"yalnizgarip1i@gmail.com",
    // subject:"Checking nodemailer",
    // text: "Hi There",
    // html: "<b>Hello there</b>"

    to,
    subject,
    text: message,
    html: message

},(error,success)=> {
    success ? console.log("SUCCESS", success) : console.log("ERROR",error);
})

}