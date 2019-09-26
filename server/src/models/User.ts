import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

import config from '../../config';

export interface UserDocument extends Document {
  username: string;
  email: string;
  avatar: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UserDocumentExtended extends UserDocument {
  comparePassword(password: string): Promise<boolean>;
}

export interface UserModel extends Model<UserDocumentExtended> {
  findByUsername(username: string): Promise<this>;
  findByLogin(login: string): Promise<this>;
}

const userSchema = new Schema<UserDocumentExtended>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    sparse: true,
    required: false,
    unique: true,
    trim: true,
  },
  avatar: {
    type: String,
    required: false,
    unique: false,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
});

userSchema.statics.findByUsername = async function(username: string) {
  const user = await this.findOne({
    username,
  });

  return user;
};

userSchema.statics.findByLogin = async function(login: string) {
  let user = await this.findByUsername(login);
  if (!user) {
    user = await this.findOne({ email: login });
  }
  return user;
};

userSchema.methods.comparePassword = function(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return reject(err);

      resolve(isMatch);
    });
  });
};

// encrypt password before save
userSchema.pre('save', function(next) {
  const user = this as UserDocumentExtended;

  if (!user.isModified('password') || !user.password) {
    // don't rehash if it's an old user
    next();
    return;
  }

  bcrypt.hash(user.password, config.SALTING_ROUNDS, function(err, hash) {
    if (err) {
      console.log('Error hashing password for user', user.username);
      return next(err);
    }

    // replace password with hashed password
    user.password = hash;

    return next();
  });
});

userSchema.pre('remove', function(next) {
  this.model('Message').deleteMany({ user: this._id }, next);
});

const User: UserModel = mongoose.model<UserDocumentExtended, UserModel>(
  'User',
  userSchema
);

export { User };
