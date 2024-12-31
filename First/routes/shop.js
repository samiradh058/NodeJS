const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

const adminData = require("./admin");

router.get("/", (req, res, next) => {
  //   res.send("<h1>HELLO from EXPRESS</h1>");
  // console.log(adminData.products);
  // res.sendFile(path.join(rootDir, "views", "shop.html"));

  const products = adminData.products;
  // Template engine, returns template
  res.render("shop", {
    pageTitle: "Shop",
    prods: products,
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
});

module.exports = router;
