class CustomGraphqlError extends Error {
  constructor(...args) {
    super(...args);
    this.name = this.constructor.name;
    this.status = 500;
  }
}

class CustomGraphql400Error extends CustomGraphqlError {
  constructor(...args) {
    super(...args);
    this.status = 400;
  }
}

class CustomGraphql401Error extends CustomGraphqlError {
  constructor(...args) {
    super(...args);
    this.status = 401;
  }
}

class CustomGraphql404Error extends CustomGraphqlError {
  constructor(...args) {
    super(...args);
    this.status = 404;
  }
}

class NotAllowedError extends CustomGraphql400Error {}

class NotLoggedInError extends CustomGraphql401Error {}

class IncorrectPasswordError extends CustomGraphql401Error {}

class RoomNotFoundError extends CustomGraphql404Error {}

class UserNotFoundError extends CustomGraphql404Error {}

export {
  CustomGraphqlError,
  CustomGraphql400Error,
  CustomGraphql401Error,
  CustomGraphql404Error,
  NotAllowedError,
  NotLoggedInError,
  IncorrectPasswordError,
  RoomNotFoundError,
  UserNotFoundError,
};
