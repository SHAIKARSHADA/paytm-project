const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:12345@cluster0.axbfs9v.mongodb.net/paytm');

const UserSchema =  mongoose.Schema({
  firstName: String,
  lastName: String,
  password: String,
  userName: String,
})

const AccountSchema = mongoose.Schema({
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