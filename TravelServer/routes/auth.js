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

















module.exports = authRoutes;