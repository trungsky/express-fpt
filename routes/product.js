import express from "express";

const router = express.Router();

router.get("/products", (req, res) => {
  res.send("List products");
});

router.get("/products/:id", (req, res) => {
  res.send(`ID: ${req.params.id}`);
});

router.post("/products", (req, res) => {
  res.send(req.body);
});

module.exports = router;
