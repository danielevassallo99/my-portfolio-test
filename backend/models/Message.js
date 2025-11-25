const { Schema, model, models } = require('mongoose');

const emailValidation = [
  /^\S+@\S+\.\S+$/,
  'Email must be a valid address'
];

const messageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: emailValidation
    },
    message: { type: String, required: true, trim: true },
    createdAt: { type: Date, required: true, default: Date.now }
  },
  {
    timestamps: false
  }
);

module.exports = models.Message || model('Message', messageSchema);

