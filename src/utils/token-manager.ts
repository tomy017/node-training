const jwt = require("jsonwebtoken");
const SIGN_OPTIONS = {
  algorithm: "RS256",
  expiresIn: "12h",
};

class TokenManager {
  getToken(email: string) {
    const token = jwt.sign(
      {
        user: email,
      },
      process.env.PRIVATE_KEY,
      SIGN_OPTIONS
    );
    return token;
  }
}

export { TokenManager };
