import jwt from 'jsonwebtoken';

import config from '../../config';
import { User, UserModel } from '../models/User';

interface TokenPayload {
  email: string;
  username: string;
}

const jwtOpts = {
  issuer: 'room',
};

/**
 * @typedef {Object} UserPayload
 * @property {String} [email]
 * @property {String} [username]
 */

const getTokenValue = (token: string) => token.replace('Bearer ', '');

/**
 *
 * @param {UserPayload} userPayload
 */
const signToken = (userPayload: TokenPayload) =>
  jwt.sign(userPayload, config.JWT_SECRET, jwtOpts);

const validateToken = (authToken: string) => {
  const tokenValue = getTokenValue(authToken);
  console.log('validateToken', tokenValue);
  return new Promise<TokenPayload>((resolve, reject) => {
    jwt.verify(tokenValue, config.JWT_SECRET, jwtOpts, (err, decoded) => {
      console.log('err', err);
      if (err) return reject(err);
      console.log('validatedToken', decoded);
      return resolve(decoded as TokenPayload);
    });
  });
};

const findUserByDecodedToken = async (
  validatedAuthToken: TokenPayload
): Promise<UserModel> => {
  const user = await User.findByLogin(
    validatedAuthToken.username || validatedAuthToken.email
  );

  return user;
};

export { signToken, validateToken, findUserByDecodedToken };
