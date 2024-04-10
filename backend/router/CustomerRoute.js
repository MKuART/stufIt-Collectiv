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
.route(authorize(["User"]),"/update")
.patch(customerUpdateValidator(["firstname", "lastname", "email", "password"]), validateRequest, updateCustomer)

router
.route(authorize(["Admin", "User"]), "/soft-delete")
.delete(softDeleteCustomer)

export default router;