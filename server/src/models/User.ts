import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

import config from '../../config';
import { logger } from '../utils/logger';

export interface UserDocument extends Document {
  username: string;
  email: string;
  avatar: string;
  password: string;
  firstName: string;
  lastName: string;
  recoveryToken: string;
}

interface PasswordComparer {
  (this: UserDocumentExtended, password: string): Promise<boolean>;
}

interface UserQuery {
  (this: UserModel, query: string): Promise<UserDocumentExtended | null>;
}

export interface UserDocumentExtended extends UserDocument {
  comparePassword: PasswordComparer;
}

export interface UserModel extends Model<UserDocumentExtended> {
  findByUsername: UserQuery;
  findByLogin: UserQuery;
  findByEmail: UserQuery;
}

const userSchema = new Schema<UserDocumentExtended>(
  {
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
      default: 'https://via.placeholder.com/50x50',
    },
    password: {
      type: String,
      trim: true,
    },
    recoveryToken: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const findByUserName: UserQuery = async function(username) {
  const user = await this.findOne({
    username,
  });

  return user;
};

const findByLogin: UserQuery = async function(login) {
  let user = await this.findByUsername(login);
  if (!user) {
    user = await this.findByEmail(login);
  }
  return user;
};

const findByEmail: UserQuery = async function(email) {
  const user = await this.findOne({
    email,
  });

  return user;
};

const comparePassword: PasswordComparer = function(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return reject(err);

      resolve(isMatch);
    });
  });
};

userSchema.statics.findByUsername = findByUserName;

userSchema.statics.findByLogin = findByLogin;

userSchema.statics.findByEmail = findByEmail;

userSchema.methods.comparePassword = comparePassword;

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
      logger.debug('Error hashing password for user', {
        message: user.username,
      });
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

const User = mongoose.model<UserDocumentExtended, UserModel>(
  'User',
  userSchema
);

export { User };
