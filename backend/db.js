const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:12345@cluster0.axbfs9v.mongodb.net/paytm');

const UserSchema = new mongoose.schema({
  firstName: String,
  lastName: String,
  password: String,
  userName: String,
})

const AccountSchema = new mongoose.schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  balance: Number,
})



const User = mongoose.model('User',UserSchema);
const Account = mongoose.model('Account',AccountSchema);

module.exports = {
  User,
  Account,
}