const mongoose = require("mongoose");
const authSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    workAddress: {
      flatno: {
        type: String,
        default: "",
      },
      area: {
        type: String,
        default: "",
      },
      landmark: {
        type: String,
        default: "",
      },
      address: {
        type: String,
        default: "",
      },
      latitude: {
        type: String,
        default: "",
      },
      longitude: {
        type: String,
        default: "",
      },
    },

    homeAddress: {
      flatno: {
        type: String,
        default: "",
      },
      area: {
        type: String,
        default: "",
      },
      landmark: {
        type: String,
        default: "",
      },
      address: {
        type: String,
        default: "",
      },
      latitude: {
        type: String,
        default: "",
      },
      longitude: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", authSchema);
