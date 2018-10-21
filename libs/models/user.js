const mongoose = require('mongoose');
const mongooseHidden = require('mongoose-hidden')({
  hidden: {
    _id: true,
    __v: true,
  },
});

const UserSchema = new mongoose.Schema({
  email: String,
  first_name: String,
  last_name: {
    type: String,
    default: '',
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

UserSchema.plugin(mongooseHidden);

module.exports = {
  UserSchema,
};
