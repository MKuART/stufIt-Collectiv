import express from "express"

import CustomerRoute from "./CustomerRoute.js"
import AccountRoute from "./AccountRoute.js"
import ExpensesRoute from "./AccountRoute.js"
import CategoryRoute from "./CategoryRoute.js"
import { authorize } from "../controller/MainController.js"

const router = express.Router()

router
.use("/customer", authorize(["User, Admin"]), CustomerRoute)

router
.use("/account", authorize(["Admin"]), AccountRoute)

router
.use("/expenses", authorize(["User", "Admin"]), ExpensesRoute)

router
.use("/category", authorize(["Admin"]), CategoryRoute)

export default router;