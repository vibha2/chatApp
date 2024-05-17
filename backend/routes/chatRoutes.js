const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Create Chat
// router.route("/").post(protect, accessChat);
// router.post("/", protect, accessChat );

// Get All Chat from Db for Particular User
// router.route("/").get(protect, fetchChats );

//Group Creation
// router.route("/group").post(protect, createGroupChat );

//Rename/update Group
// router.route("/rename").put(protect, renameGroup );

//Remove from Group
// router.route("/groupremove").put(protect, removeFromGroup );

//Add in the Group
// router.route("/groupadd").put(protect, addToGroup );




module.exports = router;