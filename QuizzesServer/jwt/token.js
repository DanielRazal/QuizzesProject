const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET_KEY;


const jwtToken = (admin,companies,fields) => {
    const payload = {
        id: admin.id,
        email: admin.email,
        company: companies.name,
        field: fields.name
    };
    const options = { expiresIn: "1h" };
    const token = jwt.sign(payload, secret, options);
    return token;
}

module.exports = jwtToken;
