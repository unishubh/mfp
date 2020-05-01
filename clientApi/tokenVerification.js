const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) =>{
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const Token = bearer[1];
        if(!Token){
            res.status(401).json('unauthorized- no token');
        } else {
            jwt.verify(Token, "constants.jwtString", (err, authData) =>{
                if(err) {
                    console.log(Token);
                    res.status(401).json('unauthorized- invalid token');
                } else {
                    req.id = authData.id;
                    next();
                }
            })
        }
      } else {
        res.sendStatus(403);
      }
}

module.exports = verifyToken;