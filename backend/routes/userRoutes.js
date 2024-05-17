const express = require('express');
const { registerUser, authUser, getAllUser, userBySearch } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", registerUser);
router.post("/login", authUser);
router.get("/", getAllUser);
router.get("/allUser", protect, userBySearch);



module.exports = router;