const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    subject: { type: String, required: true, trim: true },
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true }
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question