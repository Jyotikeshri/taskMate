import express from "express";
import taskRoutes from "./taskRoutes.js";
import userRoutes from "./userRoutes.js";

const router = express.Router();

router.use("/task", taskRoutes);
router.use("/user", userRoutes);

export default router;
