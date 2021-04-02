import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Ko nói nhiều, tao là hôm pết");
});

module.exports = router;
