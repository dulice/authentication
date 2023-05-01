import Joi from "joi";
import jwt from "jsonwebtoken";

export const AuthToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.SECRET_TOKEN,
    { expiresIn: "7d" }
  );
};

export const VerifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(token) {
        jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
            if(err) {
                res.status(401).json({message: 'Authentication fail'})
            }
            req.user = decoded;
            next();
        })
    } else {
        res.status(403).json({message: 'Token is not avaliable'});
    }
}

// validate schema with joi
export const schema = Joi.object({
    username: Joi.string().min(3).max(60).trim(true).required(),
    email: Joi.string().email().trim(true).required(),
    password: Joi.string().min(6).max(30).trim(true).required(),
    phoneNumber: Joi.string().max(10).pattern(/[6-9]{1}[0-9]{9}/),
})

export const localVariables = (req, res, next) => {
  req.app.locals = {
    otp: null,
    resetSession: false,
  };
  next();
};
