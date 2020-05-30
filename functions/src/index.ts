import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import * as Cors from 'cors';

admin.initializeApp();
const db = admin.firestore();
const userCollection = db.collection('Users');
const offersCollection = db.collection('LoanOffers');
const loansCollection = db.collection('Loans');

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
  cors(req, res, async () => {

    const userId = req.query.user as string;
    const offerId = req.query.offer as string;

    const userRef = await userCollection.doc(userId).get();
    const offerRef = await offersCollection.doc(offerId).get();

    if(!userRef.exists) {
      console.log(`No user: ${userId}`);
      return res.send('Unidentified User');
    }

    if(!offerRef.exists) {
      console.log(`No offer: ${offerId}`);
      return res.send('Unidentified Offer');
    }

    const user = userRef.data();
    const offer = offerRef.data();

    if(!user || !offer) {
      return res.send("Internal Server Error");
    }

    // getting dest email by query string
    const to = offer.email;//req.query.to as string;
    const nic = user.nic;
    const amount = offer.amount;
    const interest = offer.interestRate as number;//req.query.interest as unknown as number;
    const repaymentPeriod = offer.repayPeriod;
    const bank = user.bank;
    const branch = user.branch;
    const accountNo = user.savingsAccount;
    const name = user.fullName;

    let loanRef = await loansCollection.add({
      user: userId,
      userName: name,
      userNic: nic,
      userBank: bank,
      userBranch: branch,
      userAccountNo: accountNo,
      offerId: offerId,
      amount: amount,
      bank: offer.bank,
      bankImage: offer.bankImage,
      creditScore: offer.creditScore,
      description: offer.description,
      interestRate: interest,
      repayPeriod: repaymentPeriod,
      loanRequested: admin.firestore.FieldValue.serverTimestamp(),
    });

    const mailOptions = {
      from: 'Trust Credit <trustcreditloanrequest@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
      to: to,
      subject: `TrustCredit Loan Request: ${loanRef.id} - ${nic}`, // email subject
      html: "<p>Dear Loan officer,</p>" +
        `<p>This is to inform you that TrustCredit user <b>${name}</b>, holding NIC <b>${nic}</b> has requested the following loan offer from your good office.</p>` +
        `<p>Loan offer ID - ${offerId}</p>` +
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
    try {
      await transporter.sendMail(mailOptions);
      return res.send('Sent');
    }catch (e) {
      return res.send(e.toString());
    }
    // , (error, info) => {
    //   if (error) {
    //     return res.send(error.toString());
    //   }
    //   return res.send('Sent');
    // });
  });
});


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
