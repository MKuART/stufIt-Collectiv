import { Schema, model } from "mongoose";

const Account = Schema(
  {
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    budget: { type: Number, default: 0 },
    deleted: { type: String, default: false },
    customer: [{ type: Schema.Types.ObjectId, ref: "Customer" }],
    category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    role: {type: String, enum: ["User", "Admin"], default: "Admin"},
  },
  { versionKey: false, strictQuery: true }
);

export default model("Account", Account, "Accounts");

/*
customer: "Max Doe",
account: "3000",
bugdet: {

}
*/

// Um das Limit nicht u überschreiten
// const Budget = Schema({
//     limited: {
//         type: Number,
//         default: 0,
//         validate: {
//             validator: function(value) {
//                 const accountId = this.parent().customer;
//                 return value <= Types.ObjectId(accountId).money;
//             },
//             message: props => `Das Budget darf nicht größer als das Geld im Konto sein`
//         }
//     }
// }, { versionKey: false, strictQuery: true });
