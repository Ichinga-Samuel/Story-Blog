const express = require('express');
const router = express.Router();
const {ensureAuth, ensureGuest} = require('../middleware/auth');
const Story = require('../models/Stories');
const formatter = require('./helpers/formatter');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/dashboard', async (req, res) => {
    try{
        const stories = await Story.find({user: req.user.id}).lean();
        res.render('Dashboard', {name: req.user.firstName, stories, formatter})
    }
    catch (e) {
        console.error(e);
        res.render('errors/500')
    }
});

module.exports = router;