const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer');
const reviewRoutes = express.Router();

// models
const Review = require('../models/review');
const City = require('../models/city');

// multer for review image upload
const reviewUploader = multer({
	dest: __dirname + '/../public/uploads/'
});


// create a review for city
reviewRoutes.post('/api/city/:id/review/new', reviewUploader.single('reviewPhoto'), (req, res, next) => {
	const cityId = req.params.id;
	console.log("leaving review for this city: ", cityId);
	if (!req.user) {
		res.status(401).json({message: "Login to create a review for this city"});
		return;
	}
	City.findById(cityId, (err, thisCity) => {
		console.log("review posting try")
		if(err) {
			console.log(err);
			return;
		}
		const newReview = new Review({
			title: req.body.title,
			owner: req.user.username,
			content: req.body.content,
			date: Date.now(),
			image: req.body.image || ''
		})
	})
})