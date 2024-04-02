import express from "express"
import { AllCategorys, createCategory, softDeleteCategory, updateCategory } from "../controller/MainController.js";

const router = express.Router()

router
.route("/")
.get(AllCategorys)

router
.route("/create")
.post(createCategory)

router
.route("/update")
.patch(updateCategory)

router
.route("/soft-delete")
.delete(softDeleteCategory)

export default router;