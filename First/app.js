const express = require("express");

const app = express();

//Middleware
// app.use((req, res, next) => {
//   console.log("Middleware");
//   next();
// });

app.use("/add-product", (req, res, next) => {
  console.log("Next Middleware");
  res.send("<h1>Add product page</h1>");
});

app.use("/", (req, res, next) => {
  console.log("Next Middleware");
  res.send("<h1>HELLO from EXPRESS</h1>");
});

app.listen(3000);
