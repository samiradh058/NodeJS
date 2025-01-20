import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";

import { users } from "./utils/constants.mjs";

const app = express();

app.use(express.json());
app.use(cookieParser("SAM"));
app.use(
  session({
    secret: "samir",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
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
  console.log(req.session);
  console.log(req.session.id);
  req.session.visited = true;
  res.cookie("hello", "world", { maxAge: 60000, signed: true });
  res.status(201).send("Hello, World!");
});

app.post("/api/auth", (req, res, next) => {
  const {
    body: { name, password },
  } = req;
  const findUser = users.find((user) => user.name === name);
  if (!findUser || findUser.password !== password)
    return res.status(401).send({ msg: "Bad credentials" });

  req.session.user = findUser;
  return res.status(200).send(findUser);
});

app.get("/api/auth/status", (req, res, next) => {
  req.sessionStore.get(req.session.id, (err, session) => {
    console.log(session);
  });
  return req.session.user
    ? res.status(200).send(req.session.user)
    : res.status(401).send({ msg: "Not authenticated" });
});

app.post("/api/cart", (req, res, next) => {
  if (!req.session.user) return res.sendStatus(401);

  const { body: item } = req;

  const { cart } = req.session;

  if (cart) {
    cart.push(item);
  } else {
    req.session.cart = [item];
  }
  return res.status(201).send(item);
});

app.get("/api/cart", (req, res, next) => {
  if (!req.session.user) return res.sendStatus(401);
  return res.status(200).send(req.session.cart ?? []);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
