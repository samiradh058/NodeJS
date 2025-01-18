import { Router } from "express";
import {
  query,
  checkSchema,
  validationResult,
  matchedData,
} from "express-validator";
import {
  createUserValidationSchema,
  queryValidationSchema,
} from "../utils/validationSchemas.mjs";

import { users } from "../utils/constants.mjs";
import { resolveIndexByUserId } from "../utils/middlewares.mjs";

const router = Router();

router.get(
  "/api/users",
  checkSchema(queryValidationSchema),
  (req, res, next) => {
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
  }
);

router.post(
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

router.get("/api/users/:id", resolveIndexByUserId, (req, res, next) => {
  const { findUserIndex } = req;
  const findUser = users[findUserIndex];
  return res.send(findUser);
});

router.put("/api/users/:id", resolveIndexByUserId, (req, res, next) => {
  const { body, findUserIndex } = req;
  const updatedUser = { id: users[findUserIndex].id, ...body };
  users[findUserIndex] = updatedUser;
  return res.sendStatus(200);
});

router.patch("/api/users/:id", resolveIndexByUserId, (req, res, next) => {
  const { body, findUserIndex } = req;
  const updatedUser = { ...users[findUserIndex], ...body };
  users[findUserIndex] = updatedUser;
  return res.send(updatedUser);
});

router.delete("/api/users/:id", resolveIndexByUserId, (req, res, next) => {
  const { findUserIndex } = req;
  users.splice(findUserIndex, 1);
  return res.send(users);
});

export default router;
