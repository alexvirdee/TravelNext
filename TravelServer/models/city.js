const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// city schema for app
const CitySchema = new Schema({
	name: {
		type: String,
		required: false
	},
	// reviews: {
	// 	type: 
	// }
});

const City = mongoose.model('City', CitySchema);
module.exports = City;