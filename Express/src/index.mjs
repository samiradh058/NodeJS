import express from "express";
import {
  query,
  validationResult,
  body,
  matchedData,
  checkSchema,
} from "express-validator";

import {
  createUserValidationSchema,
  queryValidationSchema,
} from "./utils/validationSchemas.mjs";

const app = express();

app.use(express.json());

const users = [
  { id: 1, name: "ram", age: 42 },
  { id: 2, name: "samir", age: 20 },
  { id: 3, name: "ali", age: 25 },
  { id: 4, name: "sangam", age: 15 },
];

const loginMiddleware = (req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
};

const resolveIndexByUserId = (req, res, next) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = users.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.sendStatus(404);
  req.findUserIndex = findUserIndex;
  next();
};

// Global: for all routes
app.use(loginMiddleware, (req, res, next) => {
  console.log("Finished logging");
  next();
});

const PORT = process.env.PORT || 3000;

app.get("/api/products", (req, res, next) => {
  res.send([
    { name: "product1", price: 100 },
    { name: "product2", price: 150 },
  ]);
});

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

app.get("/api/users", checkSchema(queryValidationSchema), (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  const {
    query: { filter, value },
  } = req;
  if (filter && value) {
    return res.send(users.filter((user) => user[filter].includes(value)));
  }
  return res.send(users);
});

app.post(
  "/api/users",
  checkSchema(createUserValidationSchema),
  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }

    const data = matchedData(req);

    const newUser = { id: users[users.length - 1].id + 1, ...data };
    users.push(newUser);
    return res.status(201).send(newUser);
  }
);

app.get("/api/users/:id", resolveIndexByUserId, (req, res, next) => {
  const { findUserIndex } = req;
  const findUser = users[findUserIndex];
  return res.send(findUser);
});

app.put("/api/users/:id", resolveIndexByUserId, (req, res, next) => {
  const { body, findUserIndex } = req;
  const updatedUser = { id: users[findUserIndex].id, ...body };
  users[findUserIndex] = updatedUser;
  return res.sendStatus(200);
});

app.patch("/api/users/:id", resolveIndexByUserId, (req, res, next) => {
  const { body, findUserIndex } = req;
  const updatedUser = { ...users[findUserIndex], ...body };
  users[findUserIndex] = updatedUser;
  return res.send(updatedUser);
});

app.delete("/api/users/:id", resolveIndexByUserId, (req, res, next) => {
  const { findUserIndex } = req;
  users.splice(findUserIndex, 1);
  return res.send(users);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
