const jwt = require("jsonwebtoken");

// jwt varification
const jwtVarification = (req, res, next) => {
    try {
        var token = req.header('Authorization').split(' ')[1];
    } catch (error) {
        res.status(401).json({ "msg": "Token is not provided" });
    }

    if (!token) {
        res.status(401).json({ "msg": "Token is not provided" });
    };

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401).json({ "msg": "Token is not varified" });;
    });

    const token_json = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET)

    req.body["user_id"] = token_json.user_id;

    next();
};

module.exports = jwtVarification