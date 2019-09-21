import jwt from 'jsonwebtoken';

import config from '../../config';
import { User } from '../models/User';

const jwtOpts = {
  issuer: 'room',
};

/**
 * @typedef {Object} UserPayload
 * @property {String} [email]
 * @property {String} [username]
 */

const getTokenValue = token => token.replace('Bearer ', '');

/**
 *
 * @param {UserPayload} userPayload
 */
const signToken = userPayload =>
  jwt.sign(userPayload, config.JWT_SECRET, jwtOpts);

const validateToken = authToken => {
  const tokenValue = getTokenValue(authToken);
  console.log('validateToken', tokenValue);
  return new Promise((resolve, reject) => {
    jwt.verify(tokenValue, config.JWT_SECRET, jwtOpts, (err, decoded) => {
      console.log('err', err);
      if (err) return reject(err);
      console.log('validatedToken', decoded);
      return resolve(decoded);
    });
  });
};

const findUserByDecodedToken = authToken => {
  return async validatedAuthToken => {
    const user = await User.findByLogin(
      validatedAuthToken.username || validatedAuthToken.email
    );

    return user;
  };
};

export { signToken, validateToken, findUserByDecodedToken };
