const mongoose = require('mongoose');

const DynamicContentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, default: '' },
    position: {
        type: String,
        required: true,
        enum: ['above-home', 'below-home', 'below-about', 'below-contact', 'below-volunteer', 'below-feedback', 'below-complaints']
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('DynamicContent', DynamicContentSchema);