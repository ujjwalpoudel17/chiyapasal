const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//Admin creates staff either waiter or reception
exports.registerStaff = async (req, res) => {
try{
    const{name,email,password,role} = req.body;

    if(!name || !email || !password || !role) {
        return res.status(400).json({
            success: false,
            message: "please enter all the fields"
        });
    }

    //check existing user

const existingUser = await User.findOne({email});
if(existingUser){
    return res.status(400).json({
        success: false,
        message: "User with this email already exists"
    });
}

const hashedPassword = await bcrypt.hash(password, 10);

await User.create({
    name,
    email,
    password: hashedPassword,
    role
});
res.status(201).json({
    success: true,
    message: "Staff created Successfully"
});
}
catch (error) {
    console.error(error);
    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
}
};


//Login for all roles
exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please enter all the fields"
            });
        }
        const user = await User.findOne({email});
        if(!user || !user.isActive){
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }
const token = jwt.sign({
    id: user._id, role: user.role
},process.env.JWT_SECRET, {expiresIn: '1d'});
res.json({
    success: true,
    message: "Login Successful",
    token,
    user:{
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }
});
     }
     catch (error){
        console.error("login error", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
     }
    };

//Get the Login user Profile
exports.getProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
    res.json({
        success: true,
        user
    });
}
catch(error){
    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
}
};

//get waiters
exports.getWaiters = async (req, res) => {
    try{
        const waiters = await User.find({role: 'waiter'}).select('-password');
    res.json({
        success: true,
        waiters
    });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
