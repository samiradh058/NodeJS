import express from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const users = [
  { id: 1, name: "ram", age: 42 },
  { id: 2, name: "samir", age: 20 },
  { id: 3, name: "ali", age: 25 },
  { id: 4, name: "sangam", age: 15 },
];

app.get("/", (req, res, next) => {
  res.status(201).send("Hello, World!");
});

app.get("/api/users", (req, res, next) => {
  console.log(req.query);
  const {
    query: { filter, value },
  } = req;
  if (filter && value) {
    return res.send(users.filter((user) => user[filter].includes(value)));
  }
  return res.send(users);
});

app.post("/api/users", (req, res, next) => {
  const { body } = req;
  const newUser = { id: users[users.length - 1].id + 1, ...body };
  users.push(newUser);
  return res.status(201).send(newUser);
});

app.get("/api/users/:id", (req, res, next) => {
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)) {
    return res.status(400).send({ message: "Invalid id" });
  }
  const findUser = users.find((user) => user.id === parsedId);
  if (!findUser) {
    return res.sendStatus(400);
  }
  return res.send(findUser);
});

app.get("/api/products", (req, res, next) => {
  res.send([
    { name: "product1", price: 100 },
    { name: "product2", price: 150 },
  ]);
});

app.put("/api/users/:id", (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = users.findIndex((user) => user.id === parsedId);

  if (findUserIndex === -1) {
    return res.sendStatus(404);
  }

  users[findUserIndex] = { id: parsedId, ...body };
  return res.sendStatus(200);
});

app.patch("/api/users/:id", (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = users.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.sendStatus(404);
  const updatedUser = { ...users[findUserIndex], ...body };
  users[findUserIndex] = updatedUser;
  return res.send(updatedUser);
});

app.delete("/api/users/:id", (req, res, next) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = users.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.sendStatus(404);
  users.splice(findUserIndex, 1);
  return res.send(users);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
