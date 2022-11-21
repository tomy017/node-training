const jwt = require("jsonwebtoken");
const SIGN_OPTIONS = {
  algorithm: "RS256",
  expiresIn: "12h",
};

function addHours(hours: number, date = new Date()): Date {
  date.setTime(date.getTime() + hours * 60 * 60 * 1000);
  return date;
}

class TokenManager {
  getToken(email: string) {
    const token = jwt.sign(
      {
        user: email,
        expires: addHours(12),
      },
      process.env.PRIVATE_KEY,
      SIGN_OPTIONS
    );
    return token;
  }
}

export { TokenManager };
