const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:12345@cluster0.axbfs9v.mongodb.net/paytm');

const UserSchema = mongoose.schema({
  firstName: String,
  lastName: String,
  password: String,
  userName: String,
})

const User = mongoose.model('User',UserSchema);

module.exports = {
  User
}