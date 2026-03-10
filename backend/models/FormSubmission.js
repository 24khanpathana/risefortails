const mongoose = require('mongoose');

const FormSubmissionSchema = new mongoose.Schema({
    formId: { type: mongoose.Schema.Types.ObjectId, ref: 'DynamicContent' },
    formTitle: { type: String },
    data: { type: Map, of: String },
    submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FormSubmission', FormSubmissionSchema);