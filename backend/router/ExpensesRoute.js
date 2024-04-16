import express from "express"
import { AllExpenses, createExpenses, softDeleteExpenses, updateExpenses } from "../controller/MainController.js";

const router = express.Router()

router
.route("/")
.post(AllExpenses)

router
.route("/create")
.post(createExpenses)

router
.route("/update")
.patch(updateExpenses)

router
.route("/soft-delete")
.delete(softDeleteExpenses)

export default router;