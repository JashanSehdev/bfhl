import express from "express";
import { processHierarchy } from "../controllers/bfhlController.js";

const router = express.Router();

router.post("/", processHierarchy);

export default router;