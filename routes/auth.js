const express = require("express");
const router = express.Router();

import { signup, signin, signout } from "../controllers/auth";

router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;
