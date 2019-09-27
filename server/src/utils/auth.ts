import jwt from 'jsonwebtoken';

import config from '../../config';
import { User, UserDocumentExtended } from '../models/User';
import { logger } from './logger';

interface TokenPayload {
  email: string;
  username: string;
}

const jwtOpts = {
  issuer: 'room',
};

const getTokenValue = (token: string) => token.replace('Bearer ', '');

const signToken = (userPayload: TokenPayload) =>
  jwt.sign(userPayload, config.JWT_SECRET, jwtOpts);

const validateToken = (authToken: string) => {
  const tokenValue = getTokenValue(authToken);
  logger.debug('validateToken ', { tokenValue });
  return new Promise<TokenPayload>((resolve, reject) => {
    jwt.verify(tokenValue, config.JWT_SECRET, jwtOpts, (err, decoded) => {
      if (err) {
        logger.error('err', { error: err });
        return reject(err);
      }
      logger.debug('validatedToken ', { decoded });
      return resolve(decoded as TokenPayload);
    });
  });
};

const findUserByDecodedToken = async (
  validatedAuthToken: TokenPayload
): Promise<UserDocumentExtended | null> => {
  const user = await User.findByLogin(
    validatedAuthToken.username || validatedAuthToken.email
  );

  return user;
};

export { signToken, validateToken, findUserByDecodedToken };
