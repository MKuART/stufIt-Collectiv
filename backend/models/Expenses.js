import { Schema, model } from "mongoose";

const ExpensesSchema = new Schema(
  {
    description: { type: String, default: "N/A" },
    cost: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
    deleted: { type: String, default: false },
    account: [{ type: Schema.Types.ObjectId, ref: "Account"}],
    category: [{ type: Schema.Types.ObjectId,ref: "Category"}],
  },
  { versionKey: false, strictQuery: true }
);

export default model("Expense", ExpensesSchema, "expenses");

/* 
customer: "John Mustermann",
category: "Auto",
description: "tanken",
cost: "100",
date: 26.03.2024 TM 11:51
}
*/
