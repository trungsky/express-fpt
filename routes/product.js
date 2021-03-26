import express from "express";
import {
  create,
  list,
  findById,
  deleteById,
  updateById,
} from "../controllers/product";
const router = express.Router();

router.get("/products", list);

router.get("/products/:id", findById);

router.post("/products", create);

router.delete("/products/:id", deleteById);

router.patch("/products/:id", updateById);

router.param("id", productById);

module.exports = router;
