const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Reviews of specific city 
const ReviewSchema = new Schema({
	title: {
		type: String,
		required: [true, "Title for review is required"]
	},
	owner: {
		type: String
		// ref: 'User'
	},
	content: {
		type: String,
		required: [true, "Review content is required"]
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	image: {
		type: String,
		required: [false, "image for review is not required"],
		default: ''
	}
});

const Review = mongoose.model('Review', ReviewSchema)
module.exports = Review;