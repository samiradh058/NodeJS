const path = require("path");

const express = require("express");

// const rootDir = require("../util/path");

const router = express.Router();

const productsController = require("../controllers/products");
``;

//Middleware
// app.use((req, res, next) => {
//   console.log("Middleware");
//   next();
// });

// get and post will do exact match, use will just check

router.get("/add-product", productsController.getAddProduct);

// app.use("/product", (req, res, next) => {
//   console.log(req.body);
//   res.redirect("/");
// });

// app.post("/product", (req, res, next) => {
//   console.log(req.body);
//   res.redirect("/");
// });

router.post("/add-product", productsController.postAddProduct);

// module.exports = router;

// exports.routes = router;
// exports.products = products;

module.exports = router;
