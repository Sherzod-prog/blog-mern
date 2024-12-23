const express = require("express");
const { authRoute } = require("./authRoute.js"); // Import directly
const { router: userRoute } = require("./userRoute.js");
const { router: postRoute } = require("./postRoute.js");

const router = express.Router();

router.use("/auth", authRoute); // Use the authRoute
router.use("/users", userRoute);
router.use("/posts", postRoute);

module.exports = router;
