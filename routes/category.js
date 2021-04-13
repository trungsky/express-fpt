import express from "express";
const router = express.Router();
import { userById } from "../controllers/user";
import { requireSignin, isAdmin, isAuth } from "../controllers/auth";
import {
  create,
  lists,
  read,
  remove,
  update,
  categoryById,
} from "../controllers/category";

router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/category/:categoryId", read);
router.delete("/category/:categoryId/:userId", remove);
// router.put("/category/:categoryId/:userId", update);
router.put("/category/:categoryId/:userId", requireSignin, isAuth, isAdmin, update);
router.get("/categories", lists);

// router.param("userId", userById);
router.param("categoryId", categoryById);
router.param("userId", userById);

module.exports = router;
