const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require("../controllers/chatControllers");

const router = express.Router();

// Create Chat
// router.route("/").post(protect, accessChat);
router.post("/", protect, accessChat );

// Get All Chat from Db for Particular User
router.route("/").get(protect, fetchChats );

//Group Creation
router.route("/group").post(protect, createGroupChat );

//Rename/update Group
router.route("/rename").put(protect, renameGroup );

//Add in the Group
router.route("/groupadd").put(protect, addToGroup );

//Remove from Group
router.route("/groupremove").put(protect, removeFromGroup );






module.exports = router;