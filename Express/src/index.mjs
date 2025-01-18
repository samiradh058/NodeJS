import express from "express";
import routes from "./routes/index.mjs";

const app = express();

app.use(express.json());
app.use(routes);

const loginMiddleware = (req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
};

// Global: for all routes
app.use(loginMiddleware, (req, res, next) => {
  console.log("Finished logging");
  next();
});

const PORT = process.env.PORT || 3000;

app.get(
  "/",
  (req, res, next) => {
    console.log("Base URL");
    next();
  },
  (req, res, next) => {
    res.status(201).send("Hello, World!");
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
