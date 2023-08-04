const mongoose = require("mongoose");
const { env } = require("../../environment");

let tokonomicsSchema = mongoose.Schema(
  {
    token_name: {
      type: String,
      required: true,
    },
    token_supply: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Tokonomics = mongoose.model(
  `${env.PROJECT_NAME}Tokonomics`,
  tokonomicsSchema
);

module.exports = { Tokonomics };
