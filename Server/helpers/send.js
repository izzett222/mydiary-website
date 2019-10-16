export default class Send {
  constructor() {
    this.statusCode = null;
    this.message = null;
    this.data = null;
  }

  successful(statusCode, message, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  error(statusCode, error) {
    this.statusCode = statusCode;
    if (error.details) {
      this.message = error.details[0].message;
    }
    this.message = error.message;
  }

  send(res) {
    const result = {
      status: this.statusCode,
      message: this.message,
      data: this.data
    };
    if (this.message === null) {
      delete result.message;
    }
    if (this.data === null) {
      delete result.data;
    }
    return res.status(this.statusCode).json(result);
  }
}
