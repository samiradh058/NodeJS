import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser("SAM"));
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

app.get("/", (req, res, next) => {
  res.cookie("hello", "world", { maxAge: 60000, signed: true });
  res.status(201).send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
