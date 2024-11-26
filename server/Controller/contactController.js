// contactController.js
const nodemailer = require('nodemailer');

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Input validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        msg: 'All fields are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        msg: 'Please provide a valid email address'
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        secure: false, // Mailtrap does not require SSL
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        },
        connectionTimeout: 20000, // 20 seconds
        greetingTimeout: 20000,   // 20 seconds
        socketTimeout: 20000  
      });
      

    // IMPORTANT: Set a specific recipient email
    const RECIPIENT_EMAIL = 'recipient@example.com'; // Replace with your email or Mailtrap test inbox

    const mailOptions = {
      from: {
        name: name,
        address: process.env.MAIL_USER // Use Mailtrap user as sender
      },
      to: RECIPIENT_EMAIL, // Specific recipient
      replyTo: email, // Allow replies to go to the form submitter
      subject: 'New Contact Form Submission',
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong> ${message}</p>
      `
    };

    // Log mail options for debugging
    console.log('Mail options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

    // Success response
    res.status(200).json({
      success: true,
      msg: 'Message sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      msg: 'Server error while sending message',
      error: error.message
    });
  }
};