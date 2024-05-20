const asyncHandler = require('express-async-handler');
const Chat = require("../Models/ChatModel");
const User = require("../Models/userModel");

//one-to-one chat
const accessChat = asyncHandler(async(req,res) => {

    const { userId } = req.body;
    //This will be a receiver Id given by user(sender)

    if(!userId)
    {
        console.log("UserId param not sent with the request");
        return res.status(400).json({
            success: false,
            message: "UserId param not sent with the request"
        })
    }

    //Check if chat of this userid already exist then we'll not create a new chat
    var isChat = await Chat.find({
        isGroupChat: false, 
         
        $and: [
            { users: { $elemMatch: { $eq: req.user._id }}} , //sender user
            { users: { $elemMatch: { $eq: userId } }}, //receiver user
        ],

        }).populate("users","-password" )
          .populate("latestMessage");

         
        console.log("1 isChat => ", isChat);

        isChat = await User.populate(isChat, {
            path: 'latestMessage.sender',
            select: "name pic email",
        });

         console.log("2 isChat => ", isChat);

        // Checks if any chat was found.
        if(isChat.length > 0){ 
            console.log("chat o if found");
            res.status(200).json({
            success: true,
            chat: isChat[0],
            });

        }else{
            //  If no chat is found, proceeds to create a new chat.
            var chatData = {
                chatName: "sender",
                isGroupChat: false,
                users: [req.user._id, userId],
            };

            try{
                const createdChat = await Chat.create(chatData);
                console.log("createdChat => ", createdChat);
                //take the chat and send it to user
                const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                    "users",
                    "-password"
                );

                console.log("FullChat => ", FullChat);

                 return res.status(200).json({
                    success: true,
                    FullChat
                })


            }catch(error){
                res.status(400);
                throw new Error(error.message);
            }
        }

})

const fetchChats = asyncHandler(async(req,res) => {

    try{
        Chat.find({ users: { $elemMatch: { $eq: req.user._id} } })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async(results) => {
            results = await User.populate(results, {
                path: "latestMessage.sender",
                select: "name pic email",
            });

            res.status(200).send(results);
        });

    }catch(error){
        res.status(400);
        throw new Error(error.message);
    }

});

//It will take array of user and group name
const createGroupChat = asyncHandler(async(req,res) => {


     if(!req.body.users || !req.body.name)
    {
        console.log("All the fields should be filled");
        return res.status(400).json({
            success: false,
            message: "All the fields should be filled"
        })
    }

    // req.body.users -> tthis is in array form , to convert in stringify we use JSON.parse
    var allUsers = JSON.parse(req.body.users);

    if(allUsers.length < 2){
        console.log("More than 2 users are required to form a group chat");
        return res.status(400).json({
            success: false,
            message: "More than 2 users are required to form a group chat"
        })
    }

    //current user logged in should also be there
    allUsers.push(req.user);

    try{
        const groupChat = await Chat.create({
            chatName: req.body.name,
            isGroupChat: true,
            users: allUsers,
            groupAdmin: req.user,

        });

        //fetch this group chat from db and sendit back to user
        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
           .populate("users", "-password")
           .populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat); 

    }catch(error){
        res.status(400);
        throw new Error(error.message);
    }


})

//rename group
const renameGroup = asyncHandler(async(req, res) => {

    const { chatId, chatName } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName
        },
        {
            new: true
        }
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

    if(!updatedChat)
    {
        console.log("Chat not found");
        return res.status(404).json({
            success: false,
            message: "Chat not found"
        })
    }
    else{
        res.json(updatedChat);
    }

});

const addToGroup = asyncHandler(async(req, res) => {

    const { chatId, userId } = req.body;

    const updatedGroup = await Chat.findByIdAndUpdate(
        chatId,
        { $push: { users: userId } },
        {
            new: true
        }
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

    if(!updatedGroup){
        res.status(404);
        throw new Error("Chat Not Found")
    }else{
        res.json(updatedGroup);
    }
 })

const removeFromGroup = asyncHandler(async(req,res) => {
    const { chatId, userId } = req.body;

    const removed = await Chat.findByIdAndUpdate(
        chatId,
        { $pull: { users: userId } },
        {
            new: true
        }
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

    if(!removed){
        res.status(404);
        throw new Error("Chat Not Found")
    }else{
        res.json(removed);
    }
})

module.exports = { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup };