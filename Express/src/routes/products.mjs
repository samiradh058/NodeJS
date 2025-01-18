import { Router } from "express";

const router = Router();

router.get("/api/products", (req, res, next) => {
  res.send([
    { name: "product1", price: 100 },
    { name: "product2", price: 150 },
  ]);
});

export default router;
