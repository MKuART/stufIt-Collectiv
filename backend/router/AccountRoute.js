import express from "express"
import { AllAccounts, createAccount, softDeleteAccount, updateAccount } from "../controller/MainController.js";

const router = express.Router()

router
.route("/")
.get(AllAccounts)

router
.route("/create")
.post(createAccount)

router
.route("/update")
.patch(updateAccount)

router
.route("/soft-delete")
.delete(softDeleteAccount)

export default router;