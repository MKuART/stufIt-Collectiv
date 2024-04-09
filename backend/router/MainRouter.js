import express from "express"

import CustomerRoute from "./CustomerRoute.js"
import AccountRoute from "./AccountRoute.js"
import ExpensesRoute from "./ExpensesRoute.js"
import CategoryRoute from "./CategoryRoute.js"

const router = express.Router()

router
.use("/customer", CustomerRoute)

router
.use("/account", AccountRoute)

router
.use("/expenses", ExpensesRoute)

router
.use("/category", CategoryRoute)

export default router;