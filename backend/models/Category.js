import { Schema, model } from "mongoose";

const Category = Schema(
  {
    name: {type: String, default: "N/A"},
    limitedBudget: {type: Number, default: 0}
  },
  { versionKey: false, strictQuery: true }
);

export default model("Category", Category, "Categorys");

/*
name: "Auto",
budget: 30.000€
*/