import jwt from "jsonwebtoken";
export const AuthToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.SECRET_TOKEN,
    { expiresIn: "24h" }
  );
};

export const VerifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Authentication failed" });
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(403).json({ message: "no token available" });
  }
};

export const localVariables = (req, res, next) => {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
};
