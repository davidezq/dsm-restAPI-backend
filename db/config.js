const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);
    console.log("DB UP!");
  } catch (error) {
    console.log(error);
    throw new Error("Error to connect to the mongoDB");
  }
};

module.exports = {
  dbConnection,
};
