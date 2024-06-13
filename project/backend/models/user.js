const { ObjectId } = require('mongodb');

class user {
  constructor(username, email, password) {
    this.username = username;
    this.email = email.toLowerCase(); // Normalize email
    this.password = password; // Hash the password before saving
    this.createdAt = new Date();
  }

  static validate(user) {
    const errors = {};
    if (!user.username) errors.username = 'Username is required';
    if (!user.email) errors.email = 'Email is required';
    if (!user.password) errors.password = 'Password is required';
    return errors;
  }
}

module.exports = user;

