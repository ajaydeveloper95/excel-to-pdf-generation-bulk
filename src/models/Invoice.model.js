import { Schema, model } from "mongoose";

const invoiceSchema = new Schema({
    RRN: {
        type: String,
        required: [true, "Please Enter RRN !"]
    },
    MerchantName: {
        type: String,
        required: [true, "Please Enter Merchant Id !"]
    },
    Txndate: {
        type: String,
        required: [true, "Please Select member Type !"]
    },
    Txntime: {
        type: String,
        required: [true, "Please Select member Type !"]
    },
    Txnamount: {
        type: String,
    },
    STATUS: {
        type: String,
    },
}, { timestamps: true });

export default new model("invoice", invoiceSchema);