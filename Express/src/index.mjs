import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import "./strategies/local-strategy.mjs";

const app = express();

mongoose
  .connect("mongodb://localhost:27017/learn_express")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

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
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.post("/api/auth", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Error during authentication:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!user) {
      console.log("Authentication failed:", info);
      return res.status(401).json({ message: "Authentication failed" });
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error("Error during login:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      console.log("Authentication successful:", user);
      return res.status(200).json({ message: "Authentication successful" });
    });
  })(req, res, next);
});

app.get("/api/auth/status", (req, res, next) => {
  console.log("Checking auth status");
  console.log("req.user:", req.user);
  console.log("req.session:", req.session);

  return req.user ? res.send(req.user) : res.sendStatus(401);
});

const loginMiddleware = (req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
};

// Global: for all routes
app.use(loginMiddleware, (req, res, next) => {
  console.log("Finished logging");
  next();
});

app.post("/api/auth/logout", (req, res, next) => {
  if (!req.user) return res.sendStatus(401);
  req.logout((err) => {
    if (err) return res.sendStatus(400);
    res.send(200);
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res, next) => {
  console.log(req.session);
  console.log(req.session.id);
  req.session.visited = true;
  res.cookie("hello", "world", { maxAge: 60000, signed: true });
  res.status(201).send("Hello, World!");
});

// Session
// app.post("/api/auth", (req, res, next) => {
//   const {
//     body: { name, password },
//   } = req;
//   const findUser = users.find((user) => user.name === name);
//   if (!findUser || findUser.password !== password)
//     return res.status(401).send({ msg: "Bad credentials" });

//   req.session.user = findUser;
//   return res.status(200).send(findUser);
// });

// app.get("/api/auth/status", (req, res, next) => {
//   req.sessionStore.get(req.session.id, (err, session) => {
//     console.log(session);
//   });
//   return req.session.user
//     ? res.status(200).send(req.session.user)
//     : res.status(401).send({ msg: "Not authenticated" });
// });

// app.post("/api/cart", (req, res, next) => {
//   if (!req.session.user) return res.sendStatus(401);

//   const { body: item } = req;

//   const { cart } = req.session;

//   if (cart) {
//     cart.push(item);
//   } else {
//     req.session.cart = [item];
//   }
//   return res.status(201).send(item);
// });

// app.get("/api/cart", (req, res, next) => {
//   if (!req.session.user) return res.sendStatus(401);
//   return res.status(200).send(req.session.cart ?? []);
// });
