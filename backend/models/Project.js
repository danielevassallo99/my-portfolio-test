const { Schema, model, models } = require('mongoose');

const projectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: 'At least one image URL is required'
      }
    },
    featured: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, required: true, default: Date.now }
  },
  {
    timestamps: false
  }
);

module.exports = models.Project || model('Project', projectSchema);

