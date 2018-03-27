const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Country schema
const CountrySchema = new Schema({
	name: {
		type: String,
		required: true
	}
});

const Country = mongoose.model('Country', CountrySchema);
module.exports = Country;