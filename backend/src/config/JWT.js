const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function JWTsign(payload) {
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

    if (!JWT_SECRET_KEY) {
        console.error('JWT Secret Key is missing');
        return null;
    }

    try {
        const token = jwt.sign({ id: payload }, JWT_SECRET_KEY, {
            algorithm: 'HS256', // Change to RS256 if you are using RSA keys
            expiresIn: '10s',
        });
        console.log(token);
        return token;
    } catch (error) {
        console.error('Error signing JWT:', error);
        return null;
    }
}

function JWTverify(JWTtoken) {
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

    if (!JWT_SECRET_KEY) {
        console.error('JWT Secret Key is missing');
        return null;
    }

    try {
        const decoded = jwt.verify(JWTtoken, JWT_SECRET_KEY);
        return decoded;
    } catch (error) {
        console.error('Error verifying JWT:', error);
        return null;
    }
}

module.exports = {
    JWTsign,
    JWTverify
};
