import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

const users = [
  { id: 1, name: "Ram", age: 30 },
  { id: 2, name: "Samir", age: 20 },
  { id: 3, name: "Ali", age: 25 },
];

app.get("/", (req, res, next) => {
  res.status(201).send("Hello, World!");
});

app.get("/api/users", (req, res, next) => res.send(users));

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
