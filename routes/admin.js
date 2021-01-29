const express = require('express');
const passport  = require('passport');
const Story = require('../models/Stories');
const {ensureAuth, ensureGuest} = require('../middleware/auth');

const router = express.Router();
router.get('/', (req, res)=>{
    res.render('admin/login');
})
router.post('/', passport.authenticate('local', {failureRedirect: '/admin', failureFlash: false}), async (req, res)=>{
    let stories = Story.find({status: 'public'}).populate('user').lean();
    res.render('admin/adminpage', {stories, name: req.user.firstName })
});


module.exports = router;