import express from "express"
import { AllCustomers, authorize, createCustomer, softDeleteCustomer, updateCustomer } from "../controller/MainController.js";
import { customerValidator, customerUpdateValidator, validateRequest } from "../middlewares/validator/customerValidator.js";
const router = express.Router()


router
.route("/")
.get(AllCustomers)

router
.route("/create")
.post(customerValidator, validateRequest, createCustomer)

router
.route("/update", authorize(["User"]))
.patch(customerUpdateValidator(["firstname", "lastname", "email", "password"]), validateRequest, updateCustomer)

router
.route("/soft-delete", authorize(["Admin", "User"]))
.delete(softDeleteCustomer)

export default router;