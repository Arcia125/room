import mailgun from 'mailgun-js';

import config from '../../config';
import { User } from '../models/User';
import { createRecoveryToken } from './auth';
import { logger } from './logger';

const mailIsConfigured =
  typeof config.MAILGUN_API_KEY === 'string' &&
  typeof config.MAILGUN_DOMAIN === 'string';

interface SendFunction {
  (options: { to: string; subject: string; message: string }): Promise<
    mailgun.messages.SendResponse
  >;
}

interface Sender {
  (options: { to: string; subject?: string; message?: string }):
    | Promise<mailgun.messages.SendResponse>
    | undefined;
}

interface CreateSenderFunction {
  (options: { message?: string; subject?: string }): Sender;
}

// interface PasswordComparer {
//   (this: UserDocumentExtended, password: string): Promise<boolean>;
// }

class MailgunNotConfiguredError extends Error {
  public constructor(message?: string) {
    super(`Mailgun not configured${message ? ' ' + message : ''}`);
  }
}

let mg: mailgun.Mailgun | undefined;
let send: SendFunction;
let createSender: CreateSenderFunction;

if (mailIsConfigured) {
  const apiKey = (config.MAILGUN_API_KEY as unknown) as string;
  const domain = (config.MAILGUN_DOMAIN as unknown) as string;
  mg = mailgun({
    apiKey,
    domain,
  });

  send = ({ message, subject, to }) => {
    const data = {
      from: config.MAILGUN_SENDER,
      to,
      subject,
      html: message,
    };

    return new Promise((resolve, reject) => {
      if (!(data.to && data.from && data.subject && data.html))
        return reject(new Error('Missing arguments to send'));
      if (mg) {
        mg.messages().send(data, function(err, body) {
          if (err) return reject(err);
          resolve(body);
        });
      } else {
        reject(new MailgunNotConfiguredError());
      }
    });
  };

  createSender = ({ message, subject }) => {
    return ({ message: newMessage, subject: newSubject, to }) => {
      const msg = message || newMessage;
      const sub = subject || newSubject;
      if (msg && sub && to) {
        return send({
          message: msg,
          subject: sub,
          to,
        });
      }
    };
  };
} else {
  send = ({
    message,
    subject,
    to,
  }: {
    message: string;
    subject: string;
    to: string;
  }) => {
    return Promise.reject(new MailgunNotConfiguredError());
  };

  createSender = (...args) => {
    throw new MailgunNotConfiguredError();
  };
}

const sendRecoveryEmail = async ({ email }: { email: string }) => {
  const sender = createSender({ subject: 'Recover password' });
  const user = await User.findOne({ email });

  if (!user) {
    return {
      success: false,
    };
  }

  const token = await createRecoveryToken();

  logger.info('recovery token created', { token });

  user.recoveryToken = token;

  await user.save();

  const result = await sender({
    message: `<h1>Recover Your Password</h1><p><a href="https://room-dev.herokuapp.com/forgot-password/${token}">Click here</a> to reset your password.</p>`,
    to: user.email,
  });

  logger.info('result', { result });

  return {
    success: true,
  };
};

export { sendRecoveryEmail, mailIsConfigured };
