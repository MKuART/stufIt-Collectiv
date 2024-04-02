import express from "express"
import { AllExpenses, createExpenses, softDeleteExpenses, updateExpenses } from "../controller/MainController";

const router = express.Router()

router
.route("/")
.get(AllExpenses)

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