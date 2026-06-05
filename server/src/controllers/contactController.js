import { validationResult } from 'express-validator';
import { sendContactEmail } from '../config/emailConfig.js';
import { ValidationError, AppError } from '../utils/errors.js';

/**
 * Handle contact form submission.
 * Validates input, sanitizes data, and sends email via Gmail SMTP.
 *
 * POST /api/contact
 * Body: { name: string, email: string, message: string }
 */
export const submitContact = async (req, res, next) => {
  try {
    // Check validation results from express-validator middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      }));
      throw new ValidationError('Validation failed', formattedErrors);
    }

    const { name, email, message } = req.body;

    // Send email
    await sendContactEmail({ name, email, message });

    res.status(200).json({
      success: true,
      message: 'Email terkirim! Terima kasih sudah menghubungi.',
    });
  } catch (error) {
    // Handle Nodemailer-specific errors gracefully
    if (error.code === 'EAUTH') {
      return next(
        new AppError('Email service authentication failed. Please check server configuration.', 500)
      );
    }
    if (error.code === 'ESOCKET' || error.code === 'ECONNECTION') {
      return next(
        new AppError('Unable to connect to email service. Please try again later.', 503)
      );
    }
    next(error);
  }
};
