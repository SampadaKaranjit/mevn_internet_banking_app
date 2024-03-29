import dotenv from "dotenv";
import users from "./data/users.js";
import transfers from "./data/transfer.js";
import User from "./models/userModel.js";
import Transfer from "./models/transferModel.js";
import colors from "colors";

import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Transfer.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleTransfers = transfers.map((transfer) => {
      return { ...transfer, user: adminUser };
    });

    await Transfer.insertMany(sampleTransfers);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Transfer.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
