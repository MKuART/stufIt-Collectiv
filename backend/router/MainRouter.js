import express from "express"

import CustomerRoute from "./CustomerRoute.js"
import AccountRoute from "./AccountRoute.js"
import ExpensesRoute from "./ExpensesRoute.js"
import CategoryRoute from "./CategoryRoute.js"
import { authorize, isLoggedIn } from "../controller/MainController.js"

const router = express.Router()

router
.use("/customer", CustomerRoute)

router
.use("/account", AccountRoute)

router
.use("/expenses", authorize(["Admin"]),ExpensesRoute)

router
.use("/category", authorize(["Admin", "User"]),CategoryRoute)

router
.route("/check-cookie")
.get(isLoggedIn)

export default router;