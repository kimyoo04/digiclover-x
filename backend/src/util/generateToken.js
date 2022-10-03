const jwt = require("jsonwebtoken");

export const generateJwtToken = (userId) => {
  const token = jwt.sign(
    {
      id: userId,
      // iat: new Date().getTime(), // current time
      // exp: new Date().setDate(new Date().getDate() + 1), //1d
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
  return token;
};
