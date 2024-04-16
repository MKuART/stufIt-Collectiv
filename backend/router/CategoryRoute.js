import express from "express"
import { AllCategorys, authorize, createCategory, findCategory, hardDeleteCategory, softDeleteCategory, updateCategory } from "../controller/MainController.js";

const router = express.Router()

router
.route("/", authorize(["Admin"]))
.post(AllCategorys)

router
.route("/findById", authorize(["Admin"]))
.post(findCategory)

router
.route("/create", authorize(["Admin"]))
.post(createCategory)

router
.route("/update", authorize(["Admin"]))
.patch(updateCategory)

router
.route("/hard-delete", authorize(["Admin"]))
.delete(hardDeleteCategory)

export default router;