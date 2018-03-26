const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const User = require('../models/user');

const authRoutes = express.Router();

module.exports = authRoutes;