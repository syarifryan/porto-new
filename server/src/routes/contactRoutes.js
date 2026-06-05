import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { body } from 'express-validator';
import { submitContact } from '../controllers/contactController.js';

const router = Router();

/**
 * Rate limiter for contact endpoint.
 * NFR-07: Max 5 requests per minute per IP.
 */
const contactLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Terlalu banyak permintaan. Silakan coba lagi nanti.',
  },
});

/**
 * Validation & sanitization rules for contact form.
 * NFR-08: Input sanitization (XSS prevention).
 */
const contactValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Nama wajib diisi')
    .isLength({ min: 2, max: 100 }).withMessage('Nama harus 2-100 karakter')
    .escape(),
  body('email')
    .trim()
    .notEmpty().withMessage('Email wajib diisi')
    .isEmail().withMessage('Format email tidak valid')
    .normalizeEmail(),
  body('message')
    .trim()
    .notEmpty().withMessage('Pesan wajib diisi')
    .isLength({ min: 10, max: 2000 }).withMessage('Pesan harus 10-2000 karakter')
    .escape(),
];

/**
 * POST /api/contact
 * Submit contact form → Send email via Gmail SMTP
 */
router.post('/', contactLimiter, contactValidation, submitContact);

export default router;
