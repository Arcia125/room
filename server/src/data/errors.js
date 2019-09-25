class CustomGraphqlError extends Error {
  constructor(...args) {
    super(...args);
    this.name = this.constructor.name;
    this.status = 500;
  }
}

class CustomGraphql404Error extends CustomGraphqlError {
  constructor(...args) {
    super(...args);
    this.status = 404;
  }
}

class RoomNotFoundError extends CustomGraphql404Error {}

export { CustomGraphqlError, CustomGraphql404Error, RoomNotFoundError };
