import { Schema, model } from "mongoose";

const Customer = Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ["User", "Admin"], default: "User"},
    account: [{ type: Schema.Types.ObjectId, ref: "Account" }],
    deleted: {type: String, default: false}
}, {versionKey: false, strictQuery: true})

export default model("Customer", Customer, "Customers")