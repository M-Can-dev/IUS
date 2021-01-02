const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
	title: String,
	description: String,
	price: String,
	image: [String],
	category: String,
	isFeatured: Boolean
});

const Item = mongoose.model("item", itemSchema);

module.exports = Item;