const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const config = require("./config");
const Item = require("./models/item");

const mongoose = require('mongoose');
mongoose.connect(config.db.connection, {useNewUrlParser: true, useUnifiedTopology: true});




app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


const productsFeatured = [
	{
		title: "Dark Elf Palace - Wargaming Terrain -Hero's Hoard - Dungeons and Dragons",
		
		description: "Dark Elf Palace. Offered at mulptiple scales. Due to the working principle of FDM printers, layer visibility is inevitable even in the lowest possible layer height. All of our models are printed by investigating the model and deciding the necessary quality. Smaller models and bigger models are being printed in appropriate layer heights for best surface and service time correlation. We would like to acknowlege you on this issue and we hope that you would understand and set your quality expectations regarding to the realities. ",
		price: "592.00",
		image: "https://i.etsystatic.com/20680200/r/il/da15ad/2671443444/il_1588xN.2671443444_mb18.jpg"
	},
	{
		title: "Alliar - Reckless Batter - D&D Wargaming Miniatures -By Dopaminis - Woodland Tribe - Dungeons and Dragons ",
		description: "Alliar used to play Pineball and was her team’s star hitter. That was before the tribe wars took her husband. Now she still hits, but instead of scoring goals she racks up kills.",
		price: "78.90",
		image: "https://i.etsystatic.com/20680200/r/il/91421d/2566538342/il_1588xN.2566538342_9chz.jpg"
	},
	{
		title: "Giant Zombie 3 - D&D Wargaming Miniatures -By Brayan Nafarrate - Dungeons and Dragons ",
		description: "Giant Zombie 3 is offered at multiple sizes. Very detailed and gorgeous design of Brayan Nafarrate.",
		price: "78.90",
		image: "https://i.etsystatic.com/20680200/r/il/30493c/2716189183/il_1588xN.2716189183_ms0a.jpg"
	},

]
//Landing page
app.get("/", (req, res) => {
	res.render("landing");
});

//Items page
app.get("/products", (req, res) => {
	Item.find()
	.exec()
	.then((foundItems) =>{
		res.render("products", {products: foundItems, productsFeatured: productsFeatured});
	})
	
	.catch((err) =>{
		console.log(err)
		res.render(err)
	}) 
	
});

//Post new book
app.post("/products", (req, res) => {
	console.log(req.body);
	const category = req.body.category.toLowerCase();
	const newItem = {
		title: req.body.title,
		description: req.body.description,
		price: req.body.price,
		image: req.body.image,
		category: category,
		isFeatured: !!req.body.featured
	}
	
	Item.create(newItem)
	.then((item) => {
		console.log(item)
		res.redirect("products");
	}) 
	.catch ((err) => {
		console.log(err)
		res.redirect("/products");
	})
	
})

//New product
app.get("/products/new", (req, res) => {
	res.render("new_product")
});


// Show route
app.get("/products/:id", (req, res) => {
	Item.findById(req.params.id)
	.exec()
	.then((item) =>{
		res.render("products_show", {item})
	})
	.catch((err) => {
		res.send(err)
	})

});



//Listen
app.listen(3000, () => {
	console.log("App is running");
});