const jwt = require('jsonwebtoken');

module.exports.verifyToken = function (req, res, next) {
    const token = req.header('Authorization');
    console.log("Received Token in Backend:", token);

    if (!token) return res.status(401).json({ msg: 'No token provided' });

    try {
        const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        console.error("JWT Verification Failed:", err);
        res.status(400).json({ msg: 'Invalid Token' });
    }
};
