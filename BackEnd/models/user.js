var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  historys: {
    type: Array,
    default: [],
  },
  timeStamp: {
    type: Number,
    default: 0
  }
}, {
  collection: 'userInfo'
}, {
  timestamps: true
});

mongoose.model('User', userSchema)