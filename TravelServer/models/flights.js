const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// setup schema for flight information
const FlightSchema = new Schema({
	 start_location: {
	 	type: String,
	 	required: true
	 },
	 end_location: {
	 	type: String,
	 	required: true
	 },
	 {
	 	timestamps: true
	 }
});


const Flight = mongoose.model('Flight', FlightSchema);
module.exports = Flight;