const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

// city schema for app
const CitySchema = new Schema({
	name: {
		type: String,
		required: false
	},
	reviews: [Review.schema]
});

const City = mongoose.model('City', CitySchema);
module.exports = City;