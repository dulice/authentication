const jwt = require('jsonwebtoken');

//middleware
module.exports = function(req, res, next) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify( token, process.env.SECRET_TOKEN);
        req.user = verified;
         next();
    } catch (err) {
        res.statuse(400).send('Invalid Token')
    }
   
}