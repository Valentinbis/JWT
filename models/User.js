const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Entre email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Entre un  email valide']
  },
  password: {
    type: String,
    required: [true, 'met un mot de passe'],
  }
});


// lancer une fonction avant que le document ne soit enregistré dans la base de données
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// méthode statique pour connecter l'utilisateur
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

const User = mongoose.model('user', userSchema);

module.exports = User;