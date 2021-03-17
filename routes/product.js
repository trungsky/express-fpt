import { json } from "body-parser";
import express from "express";

const router = express.Router();

router.get("/products", (req, res) => {
  res.send("List products");
});

router.get("/products/:id", (req, res) => {
  res.json({
    id: req.params.id,
    name: `Product ${req.params.id}`,
  });
});

router.post("/products", (req, res) => {
  res.send(req.body);
});

module.exports = router;
