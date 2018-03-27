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
		});
		console.log("this is the file: ", req.file)
		if (req.file) {
			newReview.image = '/uploads/' + req.file.filename;
		}
		thisCity.reviews.push(newReview);
		thisCity.save(err => {
			if (err) {
				res.status(500).json({
					message: `Error has occurred from the database: ${err}`
				});
				return;
			}
			newReview.save((err) => {
				if (err) {
					res.status(500).json(
						{message: `Error has occurred from the database: ${err}`
						});
					return;
					}
					// validation errors
					if (err && newReview.errors) {
						res.status(400).json({
							titleError:
								newReview.errors.title
						});
						return;
					}
					req.user.encryptedPassword = undefined;
					newReview.user = req.user;

					res.status(200).json(
							newReview
						)};
			});
		});
	});
});

// delete review
reviewRoutes.delete('/api/city/:id', (req, res, next) => {
	if (!req.user) {
		res.status(401).json({ message: "login to delete review."});
		return;
	}
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({message: "Specified id is not valid."});
		return;
	}
	Review.remove({ _id: req.params.id }, err => {
		if (err) {
			res.jason(err);
			return;
		}

		res.json({
			message: "Review has been successfully removed."
		});
	});
});





