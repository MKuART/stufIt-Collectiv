import express from "express"
import { AllCustomers, createCustomer, softDeleteCustomer, updateCustomer } from "../controller/MainController.js";

const router = express.Router()


router
.route("/")
.get(AllCustomers)

router
.route("/create")
.post(createCustomer)

router
.route("/update")
.patch(updateCustomer)

router
.route("/soft-delete")
.delete(softDeleteCustomer)

export default router;