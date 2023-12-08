const HttpError = require('http-errors')
const Category = require('../Models/Category.model')
const mongoose = require('mongoose');

async function getAllCategories(req, res, next) {
    try {
        let categories = await Category.find({}, '-__v')
        if (categories.length === 0) {
            next(HttpError(404, 'No Categories Found'))
        }
        else {
            res.json(categories)
        }

    } catch (err) {
        next(err)
    }
}

module.exports = {
   getAllCategories
}