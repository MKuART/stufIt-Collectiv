import express from "express"
import { AllCategorys, createCategory, hardDeleteCategory, softDeleteCategory, updateCategory } from "../controller/MainController.js";

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
.route("/hard-delete")
.delete(hardDeleteCategory)

export default router;