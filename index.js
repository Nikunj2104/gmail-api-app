const { google } = require("googleapis");
const nodemailer = require("nodemailer");

const clientID =
  "781530599992-415p3r73fjevq4pu1bn66gnebamm0dse.apps.googleusercontent.com";
const clientSecret = "GoBLHBiaXNkPpoJCHc5XjVks";
const redirectUri = "https://developers.google.com/oauthplayground";
const refreshToken =
  "1//04VJHenjpwc0GCgYIARAAGAQSNwF-L9Irv6YSumjyLWrj4RSYW2lNSip-8cGJiJS3kH3Xw73scCrJocF32BVCKB73ZYG7LxI06nc";

const oAuth2Client = new google.auth.OAuth2(
  clientID,
  clientSecret,
  redirectUri
);
oAuth2Client.setCredentials({ refresh_token: refreshToken });

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "nikunjshah7778@gmail.com",
        clientId: clientID,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "Nikunj Shah <nikunjshah7778@gmail.com>",
      to: "shahmaglu@gmail.com",
      subject: "gmail api app",
      text: "Here is the email from gmail api app",
      html: "<h1>Here is the email from gmail api app</h1>",
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

sendMail()
  .then((result) => {
    console.log("email sent", result);
  })
  .catch((error) => {
    console.log(error.message);
  });
