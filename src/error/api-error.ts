import httpStatus from "http-status";

class ApiError extends Error {
  code: number;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }

  static badRequest(message: string): ApiError {
    return new ApiError(message, httpStatus.BAD_REQUEST);
  }
}

export { ApiError };
