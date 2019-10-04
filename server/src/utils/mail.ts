import Mailgun from 'mailgun-js';

import config from '../../config';
import { User } from '../models/User';
import { createRecoveryToken } from './auth';

const mailgun = new Mailgun({
  apiKey: config.MAILGUN_API_KEY,
  domain: config.MAILGUN_DOMAIN,
});

const send = ({
  message,
  subject,
  to,
}: {
  message: string;
  subject: string;
  to: string;
}) => {
  const data = {
    from: config.MAILGUN_SENDER,
    to,
    subject,
    html: message,
  };

  return new Promise((resolve, reject) => {
    mailgun.messages.send(data, function(err, body) {
      if (err) return reject(err);
      resolve(body);
    });
  });
};

const createSender = ({
  message,
  subject,
}: {
  message?: string;
  subject?: string;
}) => {
  return ({
    message: newMessage,
    subject: newSubject,
    to,
  }: {
    message?: string;
    subject?: string;
    to: string;
  }) => {
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

const sendRecoveryEmail = async ({ email }) => {
  const sender = createSender({ subject: 'Recover password' });
  const user = await User.findOne({ email });

  if (!user) {
    return {
      success: false,
    };
  }

  const token = await createRecoveryToken();

  user.recoveryToken = token;

  await user.save();

  const result = await sender({
    message: `<h1>Recover Your Password</h1><p>Go to <a href="https://room-dev.herokuapp.com/forgot-password/${token}"`,
    to: user.email,
  });

  return {
    success: true,
  };
};
