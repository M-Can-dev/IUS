const mongoose = require("mongoose");

const featuredItemSchema = new mongoose.Schema({
	title: String,
	description: String,
	price: String,
	image: String
});

const FeaturedItem = mongoose.model("featuredItem", featuredItemSchema);

module.exports = FeaturedItem;