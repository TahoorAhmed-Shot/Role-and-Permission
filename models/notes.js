const mongoose = require("mongoose");
const { Schema } = mongoose;

const NoteSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    tittle: {
      type: String,
      require: true,
      min: [2],
    },
    description: {
      type: String,
      require: true,
      unique: true,
    },
    tag: {
      type: String,
    },
    updateTime: {},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", NoteSchema);
