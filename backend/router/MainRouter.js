import express from "express"

import CustomerRoute from "./CustomerRoute"
import AccountRoute from "./AccountRoute"
import ExpensesRoute from "./AccountRoute"
import CategoryRoute from "./CategoryRoute"

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