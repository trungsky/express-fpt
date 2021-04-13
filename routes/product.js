import express from "express";
const router = express.Router();
import { requireSignin, isAuth, isAdmin } from "../controllers/auth";
import { userById } from "../controllers/user";

import {
  create,
  list,
  findById,
  remove,
  updateById,
  productByID,
} from "../controllers/product";

router.get("/products", list);
router.get("/products/:productId", findById);

router.post("/products/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete(
  "/products/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.patch(
  "/products/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  updateById
);

router.param("productId", productByID);
router.param("userId", userById);

module.exports = router;
