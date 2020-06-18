const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dollarSchema = new Schema(
    {
        d: String,
        v: Number
    }
);

dollarSchema.index({ d: 1 });

module.exports = mongoose.model("dollars", dollarSchema);
