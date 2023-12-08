const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('welcome-user');
    }
    else {
        res.render('welcome');
    }
})

router.get('/welcome', (req, res) => {
    res.status(301).redirect('/');
})

router.get('/login', (req, res) => {
    if (req.session.messages) {
        res.render('login', { error: req.session.messages[req.session.messages.length - 1] });
    }
    else {
        res.render('login', { error: "" });
    }
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/browse/:category/:id', (req, res) => {
    res.render('services');
})

module.exports = router;