const jwt = require("jsonwebtoken");

//protect route (require login)
exports.protect = (req, res,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }
    try{
const token = authHeader.split(" ")[1];
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = decoded;
next();
    }
    catch(error){
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }
    };

//role based access 

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                success: false,
                message: "Forbidden"
            });
        }
        next();
    };
};