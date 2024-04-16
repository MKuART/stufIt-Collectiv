import express from "express";
import {
  AllAccounts,
  accountLogin,
  authorize,
  createAccount,
  findAccount,
  getAccountData,
  softDeleteAccount,
  updateAccount,
} from "../controller/MainController.js";
import {
  accountUpdateValidator,
  accountValidator,
  validateRequest,
} from "../middlewares/validator/accountValidator.js";

const router = express.Router();

router.route("/").post(AllAccounts);

router.route("/findById").post(findAccount);

router.route("/create").post(accountValidator, validateRequest, createAccount);

router.route("/login").post(accountLogin);

router
  .route("/update", authorize(["Admin"]))
  .patch(
    accountUpdateValidator([
      "firstname",
      "lastname",
      "email",
      "password",
      "budget",
    ]),
    validateRequest,
    updateAccount
  );

router.route("/soft-delete", authorize(["Admin"])).delete(softDeleteAccount);

router.route("/get-data").post(getAccountData);

export default router;
