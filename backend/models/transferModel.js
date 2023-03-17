import mongoose from "mongoose";

const transferSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    receiverName: { type: String, required: true },
    receiverIBAN: { type: String, required: true },
    amount: { type: Number, required: true },
    transactionFee: { type: Number, required: false },
    transactionType: { type: String, required: false },
    note: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Transfer = mongoose.model("Transfer", transferSchema);

export default Transfer;
