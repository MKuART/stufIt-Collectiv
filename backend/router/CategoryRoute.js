import express from "express"
import { AllCategorys, authorize, createCategory, findCategory, softDeleteCategory, updateCategory } from "../controller/MainController.js";

const router = express.Router()

router
.route("/")
.post(AllCategorys)

router
.route("/findById")
.post(findCategory)

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