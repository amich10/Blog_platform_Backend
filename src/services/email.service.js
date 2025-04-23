import nodemailer from "nodemailer";
import { smtpConfig } from "../config/constants.js";

class EmailService {
  #transport;
  constructor() {
    try {
      const mailConfig = {
        host: smtpConfig.host,
        port: smtpConfig.port,
        auth: {
          user: smtpConfig.user,
          pass: smtpConfig.password,
        },
      };

      if (smtpConfig.provider === "gmail") {
        smtpConfig["service"] = smtpConfig.provider;
      }

      this.#transport = nodemailer.createTransport(mailConfig)
    } catch (exception) {
        console.log("Error connecting to SMTP server")
        throw exception
    }
  }
  sendEmail = async ({to,sub,message}) =>{
    try {

        return await this.#transport.sendMail({
            to:to,
            from:smtpConfig.fromAddress,
            subject:sub,
            html:message
        })
        
    } catch (exception) {
        console.log("Error occured in sending E-mail",exception)
        throw{
            //code:500 (default server error)
            message:"Sending email failed",
            status:"EMAIL_SEND_FAILED"
        }
    }
  }
}

const emailSvc = new EmailService()

export default emailSvc;