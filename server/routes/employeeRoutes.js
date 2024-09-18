import express from "express";
import multer from "multer";
import { storage } from "../cloudinaryConfig.js";
import { authMiddleware } from "../middleware/auth.js";
import { createEmployee, deleteEmployee, editEmployee, getEmployee, getEmployees } from "../controllers/employeeController.js";



const upload = multer({storage:storage})

const router = express.Router();

router.post('/create', authMiddleware,upload.single('image'),createEmployee);
router.get("/",authMiddleware,getEmployees);
router.get("/:id",authMiddleware,getEmployee);
router.put("/edit/:id",authMiddleware,upload.single('image'), editEmployee);
router.delete('/delete/:id',authMiddleware,deleteEmployee)


export default router