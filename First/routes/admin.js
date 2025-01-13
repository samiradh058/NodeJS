const path = require("path");

const express = require("express");

// const rootDir = require("../util/path");

const router = express.Router();

const adminController = require("../controllers/admin");

//Middleware
// app.use((req, res, next) => {
//   console.log("Middleware");
//   next();
// });

// get and post will do exact match, use will just check

router.get("/add-product", adminController.getAddProduct);

router.get("/products", adminController.getProducts);

// app.use("/product", (req, res, next) => {
//   console.log(req.body);
//   res.redirect("/");
// });

// app.post("/product", (req, res, next) => {
//   console.log(req.body);
//   res.redirect("/");
// });

router.post("/add-product", adminController.postAddProduct);

router.get("/edit-product/:productId", adminController.getEditProduct);

router.post("/edit-product", adminController.postEditProduct);

router.post("/delete-product", adminController.postDeleteProduct);

module.exports = router;
