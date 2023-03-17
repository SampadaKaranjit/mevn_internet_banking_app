import asyncHandler from "express-async-handler";
import Transfer from "../models/transferModel.js";

// @desc    Fetch all transfers
// @route   GET /api/transfers
// @access  Private
const getTransfers = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Transfer.countDocuments({ ...keyword });
  const transfers = await Transfer.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ transfers, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single transfer
// @route   GET /api/transfer/:id
// @access  Private
const getTransferById = asyncHandler(async (req, res) => {
  const transfer = await Transfer.findById(req.params.id);

  if (transfer) {
    res.json(transfer);
  } else {
    res.status(404);
    throw new Error("Transfer not found");
  }
});

// @desc    Create a transfer
// @route   POST /api/transfers
// @access  Private
const createTransfer = asyncHandler(async (req, res) => {
  const {
    receiverName,
    receiverIBAN,
    amount,
    transactionFee,
    transactionType,
    note,
  } = req.body;

  const transfer = new Transfer({
    user: req.user._id,
    receiverName: receiverName,
    receiverIBAN: receiverIBAN,
    amount: amount,
    transactionFee: transactionFee,
    transactionType: transactionType,
    note: note,
  });

  const createdTransfer = await transfer.save();
  res.status(201).json(createdTransfer);
});

export { getTransfers, getTransferById, createTransfer };
