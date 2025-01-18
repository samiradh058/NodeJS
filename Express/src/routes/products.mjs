import { Router } from "express";

const router = Router();

router.get("/api/products", (req, res, next) => {
  console.log(req.cookies);
  console.log(req.signedCookies.hello);
  if (req.signedCookies.hello && req.signedCookies.hello === "world") {
    return res.send([
      { name: "product1", price: 100 },
      { name: "product2", price: 150 },
    ]);
  }
  return res.send({ msg: "You need correct cookie" });
});

export default router;
