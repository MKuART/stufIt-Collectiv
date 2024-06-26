import { Schema, model } from "mongoose";
//import ExpensesSchema from "./Expenses.js";

const Category = new Schema(
  {
    name: {type: String, default: "N/A"},
    icon: {type: String},
    limitedBudget: {type: Number, default: 0},
    account: [{ type: Schema.Types.ObjectId, ref: "Account"}],
    expense: [{type: Schema.Types.ObjectId, ref: "Expenses"}]
  },
  { versionKey: false, strictQuery: true }
);

export default model("Category", Category, "Categorys");

/*
name: "Auto",
budget: 30.000€
*/