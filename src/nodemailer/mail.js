const nodemailer = require("nodemailer");
require("dotenv").config();

function sendBody(subject, body, content, link, button, link1, button1 ) {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <title></title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <style type="text/css">
          /* CLIENT-SPECIFIC STYLES */
          #outlook a {
            padding: 0;
          } /* Force Outlook to provide a "view in browser" message */
          .ReadMsgBody {
            width: 100%;
          }
          .ExternalClass {
            width: 100%;
          } /* Force Hotmail to display emails at full width */
          .ExternalClass,
          .ExternalClass p,
          .ExternalClass span,
          .ExternalClass font,
          .ExternalClass td,
          .ExternalClass div {
            line-height: 100%;
          } /* Force Hotmail to display normal line spacing */
          body,
          table,
          td,
          a {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          } /* Prevent WebKit and Windows mobile changing default text sizes */
          table,
          td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
          } /* Remove spacing between tables in Outlook 2007 and up */
          img {
            -ms-interpolation-mode: bicubic;
          } /* Allow smoother rendering of resized image in Internet Explorer */
    
          /* RESET STYLES */
          body {
            margin: 0;
            padding: 0;
          }
          img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
          }
          table {
            border-collapse: collapse !important;
          }
          body {
            height: 100% !important;
            margin: 0;
            padding: 0;
            width: 100% !important;
          }
    
          /* iOS BLUE LINKS */
          .appleBody a {
            color: #68440a;
            text-decoration: none;
          }
          .appleFooter a {
            color: #999999;
            text-decoration: none;
          }
    
          /* MOBILE STYLES */
          @media screen and (max-width: 525px) {
            /* ALLOWS FOR FLUID TABLES */
            table[class="wrapper"] {
              width: 100% !important;
            }
    
            /* ADJUSTS LAYOUT OF LOGO IMAGE */
            td[class="logo"] {
              text-align: left;
              padding: 20px 0 20px 0 !important;
            }
    
            td[class="logo"] img {
              margin: 0 auto !important;
            }
    
            /* USE THESE CLASSES TO HIDE CONTENT ON MOBILE */
            td[class="mobile-hide"] {
              display: none;
            }
    
            img[class="mobile-hide"] {
              display: none !important;
            }
    
            img[class="img-max"] {
              max-width: 100% !important;
              height: auto !important;
            }
    
            /* FULL-WIDTH TABLES */
            table[class="responsive-table"] {
              width: 100% !important;
            }
    
            /* UTILITY CLASSES FOR ADJUSTING PADDING ON MOBILE */
            td[class="padding"] {
              padding: 10px 5% 15px 5% !important;
            }
    
            td[class="padding-copy"] {
              padding: 10px 5% 10px 5% !important;
              text-align: center;
            }
    
            td[class="padding-meta"] {
              padding: 30px 5% 0px 5% !important;
              text-align: center;
            }
    
            td[class="no-pad"] {
              padding: 0 0 20px 0 !important;
            }
    
            td[class="no-padding"] {
              padding: 0 !important;
            }
    
            td[class="section-padding"] {
              padding: 50px 15px 50px 15px !important;
            }
    
            td[class="section-padding-bottom-image"] {
              padding: 50px 15px 0 15px !important;
            }
    
            /* ADJUST BUTTONS ON MOBILE */
            td[class="mobile-wrapper"] {
              padding: 10px 5% 15px 5% !important;
            }
    
            table[class="mobile-button-container"] {
              margin: 0 auto;
              width: 100% !important;
            }
    
            a[class="mobile-button"] {
              width: 80% !important;
              padding: 15px !important;
              border: 0 !important;
              font-size: 16px !important;
            }
          }
        </style>
      </head>
    
      <body style="margin: 0; padding: 0">
        <!-- HEADER -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td bgcolor="#ffffff">
              <div align="center" style="padding: 0px 15px 0px 15px">
                <table
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="500"
                  class="wrapper"
                >
                  <!-- LOGO/PREHEADER TEXT -->
                  <tr>
                    <td style="padding: 20px 0px 30px 0px" class="logo">
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                      >
                        <tr>
                          <td
                            bgcolor="#ffffff"
                            width="400"
                            align="right"
                            class="mobile-hide"
                          >
                            <table border="0" cellpadding="0" cellspacing="0">
                              <tr></tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
        </table>
    
        <!-- ONE COLUMN SECTION -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td
              bgcolor="#ffffff"
              align="center"
              style="padding: 70px 15px 70px 15px"
              class="section-padding"
            >
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="500"
                class="responsive-table"
              >
                <tr>
                  <td>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                          <!-- COPY -->
                          <table
                            width="100%"
                            border="0"
                            cellspacing="0"
                            cellpadding="0"
                          >
                            <tr>
                              <td
                                align="center"
                                style="
                                  font-size: 25px;
                                  font-family: Helvetica, Arial, sans-serif;
                                  color: #333333;
                                "
                                class="padding-copy"
                              >
                                ${subject}
                              </td>
                            </tr>
                            <tr>
                              <td
                                align="center"
                                style="
                                  padding: 20px 0 0 0;
                                  font-size: 16px;
                                  line-height: 25px;
                                  font-family: Helvetica, Arial, sans-serif;
                                  color: #666666;
                                "
                                class="padding-copy"
                              >
                                ${body}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <!-- HERO IMAGE -->
                          <table
                            width="100%"
                            border="0"
                            cellspacing="0"
                            cellpadding="0"
                          >
                            <tbody>
                              <tr>
                                <td class="padding-copy">
                                  <table
                                    width="100%"
                                    border="0"
                                    cellspacing="0"
                                    cellpadding="0"
                                  >
                                    <tr>
                                      <td>
                                        <a
                                          href="https://srijan-nits.in"
                                          ><img
                                            src="cid:unique@kreata.ee"
                                            border="0"
                                            alt="SRIJAN NIT Silchar"
                                            style="
                                            border: 0;
                                            height: auto;
                                            line-height: 100%;
                                            display: flex;
                                            height: 100px;
                                            width: 300px
                                            margin-left: auto;
                                            margin-right: auto;
                                            outline: none;
                                            text-decoration: none;
                                            "
                                            class="img-max"
                                        /></a>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <!-- COPY -->
                          <table
                            width="100%"
                            border="0"
                            cellspacing="0"
                            cellpadding="0"
                          >
                            <tr>
                              <td
                                align="center"
                                style="
                                  font-size: 25px;
                                  font-family: Helvetica, Arial, sans-serif;
                                  color: #333333;
                                  padding-top: 30px;
                                "
                                class="padding-copy"
                              >
                                ${content}
                              </td>
                            </tr>
                            <!-- <tr>
                              <td
                                align="center"
                                style="
                                  padding: 20px 0 0 0;
                                  font-size: 16px;
                                  line-height: 25px;
                                  font-family: Helvetica, Arial, sans-serif;
                                  color: #666666;
                                "
                                class="padding-copy"
                              >
                                Using fluid structures, fluid images, and media
                                queries, we can make email (nearly) as responsive as
                                modern websites.
                              </td>
                            </tr> -->
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <!-- BULLETPROOF BUTTON -->
                          <table
                            width="100%"
                            border="0"
                            cellspacing="0"
                            cellpadding="0"
                            class="mobile-button-container"
                          >
                            <tr>
                              <td
                                align="center"
                                style="padding: 25px 0 0 0"
                                class="padding-copy"
                              >
                                <table
                                  border="0"
                                  cellspacing="0"
                                  cellpadding="0"
                                  class="responsive-table"
                                >
                                  <tr>
                                    <td align="center">
                                      <a
                                        href="${link}"
                                        target="_blank"
                                        style="
                                          font-size: 16px;
                                          font-family: Helvetica, Arial, sans-serif;
                                          font-weight: normal;
                                          color: #ffffff;
                                          text-decoration: none;
                                          background-color: #5d9cec;
                                          border-top: 15px solid #5d9cec;
                                          border-bottom: 15px solid #5d9cec;
                                          border-left: 25px solid #5d9cec;
                                          border-right: 25px solid #5d9cec;
                                          border-radius: 3px;
                                          -webkit-border-radius: 3px;
                                          -moz-border-radius: 3px;
                                          display: inline-block;
                                        "
                                        class="mobile-button"
                                        >${button} &rarr;</a
                                      >
                                    </td>
                                  </tr>
                                  <tr style="margin-top:5px">
                                    <td align="center">
                                      <a
                                        href="${link1}"
                                        target="_blank"
                                        style="
                                          font-size: 16px;
                                          font-family: Helvetica, Arial, sans-serif;
                                          font-weight: normal;
                                          color: #ffffff;
                                          text-decoration: none;
                                          background-color: #5d9cec;
                                          border-top: 15px solid #5d9cec;
                                          border-bottom: 15px solid #5d9cec;
                                          border-left: 25px solid #5d9cec;
                                          border-right: 25px solid #5d9cec;
                                          border-radius: 3px;
                                          -webkit-border-radius: 3px;
                                          -moz-border-radius: 3px;
                                          display: inline-block;
                                          margin-top: 15px;
                                        "
                                        class="mobile-button"
                                        >${button1} &rarr;</a
                                      >
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `;
}

//for sending to user
const contact = (email) => {
  var transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    service: 'Godaddy',
	port: 587,
	secureConnection: false,
    auth: {
      user: process.env.NODEMAILER_EMAIL, //email id
      pass: process.env.NODEMAILER_PASSWORD, //my gmail password
    },
    tls: {
        ciphers: 'SSLv3'
    }
  });

  var mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: `${email}`,
    subject: `SRIJAN 2.0 - Brochure`,
    html: sendBody(
        `SRIJAN 2.0`,
      `<p>Thank you for subscribing to Srijan 2.0</p>`,
      `You can view our brochure attached below. <br/> Please visit our website for further details`,
      "https://srijan-nits.in",
      "Click Here",
      "https://srijan-nits.in/srijan_brochure.pdf",
      "Click Here to view the Brochure"
    ),
    attachments: [
      {
        filename: "logo.png",
        path: __dirname + "/logo.png",
        cid: "unique@kreata.ee", //same cid value as in the html img src
      },
    ],
  };
  // console.log("mailOptions : ", mailOptions);

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
module.exports = {
  contact
};