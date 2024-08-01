import express from "express";
import * as controllers from "../controllers/acreage";

// CRUD
const router = express.Router();
router.get("/all", controllers.getAcreage);

export default router;
