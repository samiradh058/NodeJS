const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

const products = [];

//Middleware
// app.use((req, res, next) => {
//   console.log("Middleware");
//   next();
// });

// get and post will do exact match, use will just check

router.get("/add-product", (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("add-product", {
    pageTitle: "Add Prduct",
    path: "/admin/add-product",
    activeAddProduct: true,
    productCSS: true,
    formCSS: true,
  });
});

// app.use("/product", (req, res, next) => {
//   console.log(req.body);
//   res.redirect("/");
// });

// app.post("/product", (req, res, next) => {
//   console.log(req.body);
//   res.redirect("/");
// });

router.post("/add-product", (req, res, next) => {
  // console.log(req.body);
  products.push({ title: req.body.title });
  res.redirect("/");
});

// module.exports = router;

exports.routes = router;
exports.products = products;
