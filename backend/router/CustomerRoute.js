import express from "express"
import { AllCustomers, createCustomer, softDeleteCustomer, updateCustomer } from "../controller/MainController.js";
import { customerValidator, customerUpdateValidator, validateRequest } from "../middlewares/validator/customerValidator.js";
const router = express.Router()


router
.route("/")
.get(AllCustomers)

router
.route("/create")
.post(customerValidator, validateRequest, createCustomer)

router
.route("/update")
.patch(customerUpdateValidator, validateRequest, updateCustomer)

router
.route("/soft-delete")
.delete(softDeleteCustomer)

export default router;