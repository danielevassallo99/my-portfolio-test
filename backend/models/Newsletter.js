const { Schema, model, models } = require('mongoose');

const emailValidation = [
  /^\S+@\S+\.\S+$/,
  'Email must be a valid address'
];

const newsletterSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: emailValidation
    },
    createdAt: { type: Date, required: true, default: Date.now }
  },
  {
    timestamps: false
  }
);

module.exports = models.Newsletter || model('Newsletter', newsletterSchema);

