const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const User = require('../models/user');

const authRoutes = express.Router();

authRoutes.post('/signup', (req, res, next) => {
    if (!req.body.signUpUsername || !req.body.signUpPassword) {
        res.status(400).json({ message: "Please provide both, username and password." });
        return;
    }
    User.findOne({ username: req.body.signUpUsername }, (err, userFromDb) => {

        if (err) {
            res.status(500).json({ message: "There was an error checking username" });
            return;
        }

        if (userFromDb) {
            res.status(400).json({ message: "That username is taken please choose another one" })
            return;
        }

        const salt = bcrypt.genSaltSync(10);
        const scrambledPassword = bcrypt.hashSync(req.body.signUpPassword, salt);

        const theUser = new User({
            username: req.body.signUpUsername,
            encryptedPassword: scrambledPassword
        });
        theUser.save((err) => {
            if (err) {
                res.status(500).json({ message: "There was an error saving the user" });
                return;
            }
            // Automatically login user after signup
            req.login(theUser, (err) => {
                if (err) {
                    res.status(500).json({ message: "There was an error logging in" });
                    return;
                }
                // clear the encrypted password before sending
                // from the object
                theUser.encryptedPassword = undefined;
                // Send the users information to the frontend 
                res.status(200).json(theUser);
            });
        });
    });
});


authRoutes.post('/login', (req, res, next) => {
	const authenticateFunction = passport.authenticate('local', (err, theUser, failureDetails) => {

		if (err) {
			res.status(500).json({message: "There has been an unkown error with the login."});
			return;
		}


		if (!theUser) {
			res.status(401).json(failureDetails);
			return;
		}
		// login successful, save the user in a session
		req.login(theUser, (err) => {
			if (err) {
				res.status(500).json({message:"Saving the session has gone wrong."});
				return;
			}

			// clear the encrypted password before sending from the object
			theUser.encryptedPassword = undefined;

			// everything worked, send the user's information to Angular
			res.status(200).json(theUser);
		});
	});
	authenticateFunction(req, res, next);
});


authRoutes.post('/logout', (req, res, next) => {
	req.logout();
	res.status(200).json({message: "logged out successfully 😎"
	});
});

authRoutes.get('/checklogin', (req, res, next) => {
	if (req.isAuthenticated()) {
		res.status(200).json(req.user);
		return;
	}

	res.status(401).json({message: "Unauthorized."});
});



module.exports = authRoutes;