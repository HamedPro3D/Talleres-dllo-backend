const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    genre: { type: String },
    author: { type: String },
    publisher: { type: String }, // casa editorial
    publicationDate: { type: Date },
    available: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
