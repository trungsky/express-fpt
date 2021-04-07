const express = require("express");
const router = express.Router();
import { userSignupValidator } from "../validator";

import { signup, signin, signout } from "../controllers/auth";

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);

module.exports = router;
