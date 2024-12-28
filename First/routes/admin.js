const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

//Middleware
// app.use((req, res, next) => {
//   console.log("Middleware");
//   next();
// });

// get and post will do exact match, use will just check

router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

// app.use("/product", (req, res, next) => {
//   console.log(req.body);
//   res.redirect("/");
// });

// app.post("/product", (req, res, next) => {
//   console.log(req.body);
//   res.redirect("/");
// });

router.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
