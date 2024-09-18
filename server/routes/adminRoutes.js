import express from "express";
import { getAdmin, signin, signOut, signup } from "../controllers/adminController.js";

const router = express.Router();


router.post("/signup",signup);
router.post("/signin",signin);
router.get("/getAdmin/:id",getAdmin)
router.get('/signout',signOut);

export default router;