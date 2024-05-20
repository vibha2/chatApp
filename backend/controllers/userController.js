const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async(req,res) => {
    
    const {name, email, password, pic } = req.body;

    if(!name || !email || !password)
    {
        res.status(400);
        throw new Error("Please Enter all the Fields");
    }

    
    const userExists = await User.findOne({ email });

    if(userExists)
    {
        res.status(400);
        throw new Error("User already exits");
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    if(user)
    {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    }else
    {
        res.status(400);
        throw new Error("Failed to create the User");
    
    }

});

const authUser = asyncHandler(async(req,res) => {

    const { email, password} = req.body;

    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password)))
    {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    }else
    {
        res.status(400);
        throw new Error("Failed to login the User");
    
    }

});

const getAllUser = asyncHandler(async(req,res) => {
    const user = await User.find({});

    if(!user)
    {
       res.status(400).json({
        success: false,
        message: "No user is registered yet"
       }) ;

       throw new Error("Failed to Get All User");
    }
    
    console.log("user=> ", user);
    return res.status(200).json({
        success: true,
        message: "All user fetched successfully",
        user,
    })

    
});

//search User
//api/user?search=juhi
const userBySearch = asyncHandler(async(req,res) => {
  const keyword = req.query.search
  ? {
      $or: [
        {name: { $regex: req.query.search, $options: "i"} },
        {email: { $regex: req.query.search, $options: "i"} },
      ],
    }
  : { };

  console.log("search by user=> ", keyword);

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  
  return res.status(200).json({
        success: true,
        message: "Searched user fetched successfully",
        users,
    })
//   res.send(users);

});

module.exports = { registerUser, authUser, getAllUser, userBySearch };