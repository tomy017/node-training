class ApiError extends Error {
  code: number;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }

  static badRequest(message: string) {
    return new ApiError(message, 400);
  }
}

export { ApiError };
