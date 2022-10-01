const jwt = require("jsonwebtoken");

export const generateJwtToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      // iat: new Date().getTime(), // current time
      // exp: new Date().setDate(new Date().getDate() + 1), //1d
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
  return token;
};
