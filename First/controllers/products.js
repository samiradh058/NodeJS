const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Prduct",
    path: "/admin/add-product",
    activeAddProduct: true,
    productCSS: true,
    formCSS: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  //   res.send("<h1>HELLO from EXPRESS</h1>");
  // console.log(adminData.products);
  // res.sendFile(path.join(rootDir, "views", "shop.html"));

  // Template engine, returns template

  Product.fetchAll((products) => {
    res.render("shop", {
      pageTitle: "Shop",
      prods: products,
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};
