import { Schema, model } from "mongoose";


const Customer = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    account: [{type: Schema.Types.ObjectId, ref: "Account"}],
    role: {type: String, enum: ["User", "Admin"], default: "User"},
    deleted: {type: String, default: false}
}, {versionKey: false, strictQuery: true})

export default model("Customer", Customer, "Customers")