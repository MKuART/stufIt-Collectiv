import express from "express"
import { AllExpenses, authorize, createExpenses, softDeleteExpenses, updateExpenses } from "../controller/MainController.js";

const router = express.Router()

router
.route("/", authorize(["Admin", "User"]))
.get(AllExpenses)

router
.route("/create", authorize(["Admin", "User"]))
.post(createExpenses)

router
.route("/update", authorize(["Admin", "User"]))
.patch(updateExpenses)

router
.route("/soft-delete", authorize(["Admin", "User"]))
.delete(softDeleteExpenses)

export default router;