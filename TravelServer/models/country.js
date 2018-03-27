const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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

// Country schema
const CountrySchema = new Schema({
	name: {
		type: String,
		required: true
	},
	geometry: GeoSchema
});

const Country = mongoose.model('Country', CountrySchema);
module.exports = Country;