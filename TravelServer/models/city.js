const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

// create GEO Location Schema
const GeoSchema = new Schema({
	type: {
		type: String,
		default: "point"
	},
	coordinates: {
		type: [Number],
		index: "2dsphere"
	}
});

// city schema for app
const CitySchema = new Schema({
	name: {
		type: String,
		required: false
	},
	reviews: [Review.schema],
	// add Geo JSON code
	geometry: GeoSchema
});

const City = mongoose.model('City', CitySchema);
module.exports = City;