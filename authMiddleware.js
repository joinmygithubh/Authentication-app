const jwt = require('jsonwebtoken');
const SECRET = "masai-secret";

let blacklist = [];

module.exports = function(req, res, next){
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({message : "Token missing"});
    }

    const token = authHeader.split(" ")[1];

    if(blacklist.includes(token)){
        return res.status(403).json({ message: "Token blacklisted"})
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({message : "Invalid or expired token"});
    }
}