import { Router } from "express";
import usersRouter from "./users.mjs";
import prouductsRouter from "./products.mjs";

const router = Router();

router.use(usersRouter);
router.use(prouductsRouter);

export default router;
