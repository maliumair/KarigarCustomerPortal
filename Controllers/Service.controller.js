const Service = require('../Models/Service.model')
const HttpError = require('http-errors')
const mongoose = require('mongoose');

async function getServiceById(req, res, next) {
    try {
        let service = await Service.findById(req.params.id)
        if (service.length === 0) {
            throw HttpError(404, "Service not found")
        }
        else {
            res.json(service)
        }
    }
    catch (err) {
        if (err instanceof mongoose.CastError) {
            next(HttpError(400, "Invalid Service ID"))
            return
        }
        next(err);
    }
}

async function getServicesByCategory(req, res, next) {
    try {
        let service = await Service.find({ category: req.params.category }, 'title price price_for icon')
        if (service.length === 0) {
            throw HttpError(404, "No Services Found in Selected Category")
        }
        else {
            res.json(service)
        }
    }
    catch (err) {
        if (err instanceof mongoose.CastError) {
            next(HttpError(400, "Invalid Category"))
            return
        }
        next(err);
    }
}

async function getAllServices(req, res, next) {
    try {
        let services = await Service.find({}, '-__v').populate({ path: "category", select: "title" })
        if (services.length === 0) {
            throw HttpError(404, 'No services Found')
        }
        else {
            res.json(services)
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getServiceById,
    getAllServices,
    getServicesByCategory
}