import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

//  User schema definition
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name']
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: 6,
    select: false //  Do not return password by default
  },
  profilePic: {
    type: String,
    default: 'https://i.ibb.co/2kR2m6T/default-user.png'
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  wishlist: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
],
  isBlocked: {
    type: Boolean,
    default: false
  },

  //  Forgot password functionality
  resetPasswordToken: String,
  resetPasswordExpire: Date

}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if password is new/changed
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//  Compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//  Generate reset password token (for forgot password)
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Save encrypted version of token in DB
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set token expiration time (15 mins)
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

//  Export model
const User = mongoose.model('User', userSchema);
export default User;
