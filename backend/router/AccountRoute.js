import express from "express";
import { AllAccounts, accountLogin, createAccount, softDeleteAccount, updateAccount } from "../controller/MainController.js";
import { accountUpdateValidator, accountValidator, validateRequest } from "../middlewares/validator/accountValidator.js";

const router = express.Router();

router.route("/")
    .get(AllAccounts);

router.route("/create")
    .post(accountValidator, validateRequest, createAccount);

router.route("/login").post(accountLogin)

router.route("/update")
    .patch(accountUpdateValidator(["firstname", "lastname", "email", "password", "budget"]), validateRequest, updateAccount);

router.route("/soft-delete")
    .delete(softDeleteAccount);

export default router;
