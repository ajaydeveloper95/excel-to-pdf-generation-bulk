import { Schema, model } from "mongoose";

const invoiceSchema = new Schema({
    RRN: {
        type: String,
    },
    MerchantName: {
        type: String,
    },
    Txndate: {
        type: String,
    },
    RefId: {
        type: String,
    },
    Txnamount: {
        type: String,
    },
    MobileNumber: {
        type: String,
    },
    STATUS: {
        type: String,
    },
}, { timestamps: true });

export default new model("invoice", invoiceSchema);