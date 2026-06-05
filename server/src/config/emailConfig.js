import nodemailer from 'nodemailer';

/**
 * Create and configure Nodemailer transporter for Gmail SMTP.
 * Requires GMAIL_USER and GMAIL_APP_PASSWORD env vars.
 */
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
};

/**
 * Build the HTML email template for contact form submissions.
 * @param {Object} data - Form data
 * @param {string} data.name - Sender name
 * @param {string} data.email - Sender email
 * @param {string} data.message - Message body
 * @returns {string} HTML email content
 */
const buildEmailTemplate = ({ name, email, message }) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0; padding:0; font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif; background-color:#0a0a0f; color:#f5f5f5;">
      <div style="max-width:600px; margin:40px auto; background:#12121a; border-radius:12px; border:1px solid #1e1e2e; overflow:hidden;">
        
        <!-- Header -->
        <div style="background:linear-gradient(135deg, #0a0a0f 0%, #12121a 100%); padding:32px; border-bottom:1px solid #1e1e2e; text-align:center;">
          <h1 style="margin:0; font-size:24px; color:#00f0ff; letter-spacing:1px;">
            📬 New Contact Message
          </h1>
          <p style="margin:8px 0 0; font-size:14px; color:#8a8a9a;">
            via Portfolio Website
          </p>
        </div>

        <!-- Content -->
        <div style="padding:32px;">
          <div style="margin-bottom:24px;">
            <p style="margin:0 0 4px; font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#8a8a9a;">From</p>
            <p style="margin:0; font-size:16px; color:#f5f5f5; font-weight:600;">${name}</p>
          </div>
          <div style="margin-bottom:24px;">
            <p style="margin:0 0 4px; font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#8a8a9a;">Email</p>
            <a href="mailto:${email}" style="font-size:16px; color:#00f0ff; text-decoration:none;">${email}</a>
          </div>
          <div style="margin-bottom:0;">
            <p style="margin:0 0 8px; font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#8a8a9a;">Message</p>
            <div style="background:#0a0a0f; padding:20px; border-radius:8px; border:1px solid #1e1e2e;">
              <p style="margin:0; font-size:15px; color:#f5f5f5; line-height:1.6; white-space:pre-wrap;">${message}</p>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="padding:20px 32px; border-top:1px solid #1e1e2e; text-align:center;">
          <p style="margin:0; font-size:12px; color:#8a8a9a;">
            Sent from your portfolio contact form • ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Send contact form email.
 * @param {Object} data - Form data { name, email, message }
 * @returns {Promise<Object>} Nodemailer send result
 */
export const sendContactEmail = async ({ name, email, message }) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_TO,
    replyTo: email,
    subject: `Portfolio Contact: ${name}`,
    html: buildEmailTemplate({ name, email, message }),
    text: `New contact message from ${name} (${email}):\n\n${message}`,
  };

  return transporter.sendMail(mailOptions);
};
