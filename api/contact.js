import nodemailer from 'nodemailer';

/**
 * Vercel Serverless Function — POST /api/contact
 * Receives contact form submissions and sends email via Gmail SMTP.
 */

// ─── Email Config ──────────────────────────────────────────────
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
};

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
        <div style="background:linear-gradient(135deg, #0a0a0f 0%, #12121a 100%); padding:32px; border-bottom:1px solid #1e1e2e; text-align:center;">
          <h1 style="margin:0; font-size:24px; color:#00f0ff; letter-spacing:1px;">📬 New Contact Message</h1>
          <p style="margin:8px 0 0; font-size:14px; color:#8a8a9a;">via Portfolio Website</p>
        </div>
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

// ─── Validation Helpers ────────────────────────────────────────
const escapeHtml = (str) =>
  str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validateBody = (body) => {
  const errors = [];
  if (!body) return [{ field: 'body', message: 'Request body is required' }];

  const { name, email, message } = body;

  if (!name || name.trim().length < 2)
    errors.push({ field: 'name', message: 'Nama wajib diisi (min 2 karakter)' });
  if (!email || !isValidEmail(email))
    errors.push({ field: 'email', message: 'Format email tidak valid' });
  if (!message || message.trim().length < 10)
    errors.push({ field: 'message', message: 'Pesan wajib diisi (min 10 karakter)' });

  return errors;
};

// ─── Handler ───────────────────────────────────────────────────
export default async function handler(req, res) {
  // CORS headers
  const allowedOrigin = process.env.CLIENT_URL || '*';
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Validate input
    const errors = validateBody(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, message: errors[0].message, errors });
    }

    // Sanitize
    const name = escapeHtml(req.body.name.trim());
    const email = req.body.email.trim().toLowerCase();
    const message = escapeHtml(req.body.message.trim());

    // Send email
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_TO,
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      html: buildEmailTemplate({ name, email, message }),
      text: `New contact message from ${name} (${email}):\n\n${message}`,
    });

    return res.status(200).json({
      success: true,
      message: 'Email terkirim! Terima kasih sudah menghubungi.',
    });
  } catch (error) {
    console.error('Contact API error:', error.message);

    if (error.code === 'EAUTH') {
      return res.status(500).json({
        success: false,
        message: 'Email service authentication failed.',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Gagal mengirim email. Silakan coba lagi nanti.',
    });
  }
}
