import express from "express";
import verifyToken from "../middlewares/verifyToken";
import * as controllers from "../controllers/user";

// CRUD
const router = express.Router();

router.use(verifyToken);
router.get("/get-current", controllers.getCurrentUser);

export default router;
