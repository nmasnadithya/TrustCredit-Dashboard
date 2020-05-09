import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import * as Cors from 'cors';

admin.initializeApp();

const cors = Cors({origin: true});

/**
 * Here we're using Gmail to send
 */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'trustcreditloanrequest@gmail.com',
    pass: 'trustcredit1290'
  }
});

exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {

    // getting dest email by query string
    const to = req.query.to as string;
    const nic = req.query.nic;
    const offerid = req.query.id;
    const amount = req.query.amount;
    const interest = req.query.interest as unknown as number;
    const repaymentPeriod = req.query.period;
    const bank = req.query.bank;
    const branch = req.query.branch;
    const accountNo = req.query.accountNo;
    const name = req.query.name;


    const mailOptions = {
      from: 'Trust Credit <trustcreditloanrequest@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
      to: to,
      subject: `TrustCredit Loan Request - ${nic}`, // email subject
      html: "<p>Dear Loan officer,</p>" +
        `<p>This is to inform you that TrustCredit user <b>${name}</b>, holding NIC <b>${nic}</b> has requested the following loan offer from your good office.</p>` +
        `<p>Loan offer ID - ${offerid}</p>` +
        "<br>" +
        "<p><b>Loan offer specifications:</b></p>" +
        `<p>Loan amount - LKR ${amount}</p>` +
        `<p>Interest rate - ${interest * 100}%</p>` +
        `<p>Repayment period - ${repaymentPeriod} days</p>` +
        "<br>" +
        "<p><b>Bank Account Details:</b></p>" +
        `<p>Bank: ${bank}</p>` +
        `<p>Branch: ${branch}</p>` +
        `<p>Savings Account No: ${accountNo}</p>` +
        "<br>" +
        "<p>Regards,</p>" +
        "<p>TrustCredit</p>" +
        `<p>${(new Date()).toDateString()}</p>`

    };

    // returning result
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.send(error.toString());
      }
      return res.send('Sent');
    });
  });
});


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
