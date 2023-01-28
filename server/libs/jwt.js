const jwt = require('jsonwebtoken');

function generateToken(payload, expires) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: expires,
    });
}

module.exports = { generateToken };
