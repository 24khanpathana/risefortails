const express = require('express');
const router = express.Router();
const FormSubmission = require('../models/FormSubmission');
const sendEmail = require('../utils/sendEmail');

router.post('/submit', async (req, res) => {
    try {
        const { formId, formTitle, data } = req.body;
        const submission = new FormSubmission({ formId, formTitle, data });
        await submission.save();

        let fieldsHtml = '';
        for (const [key, value] of Object.entries(data)) {
            fieldsHtml += `<p><strong>${key}:</strong> ${value}</p>`;
        }

        const htmlContent = `<h2>New Submission: ${formTitle}</h2>${fieldsHtml}`;
        await sendEmail({ 
            to: process.env.ADMIN_EMAIL || 'amaanp2710@gmail.com', 
            subject: `New Submission - ${formTitle}`, 
            htmlContent 
        });

        res.status(201).json({ message: 'Form submitted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;