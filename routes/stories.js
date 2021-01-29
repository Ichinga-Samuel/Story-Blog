const express = require('express');
const router = express.Router();
const {ensureAuth, ensureGuest} = require('../middleware/auth');
const Story = require('../models/Stories');
const formatter = require('./helpers/formatter');



// Show Single Story
router.get('/:id', async(req, res) => {
    try{
        let story = await Story.findById(req.params.id)
            .populate('user')
            .lean()
        if(!story){
            return res.render('errors/404')
        }
        res.render('stories/show', {story, formatter, user: res.user})
    }
    catch (e) {
        res.render('errors/404')
    }
});


router.get('/add', (req, res) => {
    res.render('stories/add');
});

router.post('/', async (req, res) => {
    try{
        req.body.user = req.user.id;
        await Story.create(req.body);
        res.redirect('/dashboard')
    }
    catch (e) {
        console.error(e);
        res.render('errors/500')
    }
});

// Show all Public Stories
router.get('/', async (req, res) => {
    try{
        const stories = await Story.find({status: 'public'})
            .populate('user')
            .sort({createdAt: 'desc'})
            .lean();
        res.render('stories/index', {stories, formatter, user: res.user})
    }
    catch (e) {
        console.error(e);
        res.render('errors/500')
    }
});
// @route for Editting
router.get('/edit/:id', async(req, res, next) => {
    const story = await Story.findOne({
        _id: req.params.id
    }).lean();
    if(!story){
        return res.render('errors/404')
    }
    /*else if(story.user._id !== req.user._id){
        res.redirect('/stories')
    }*/
    else{
        res.render('stories/edit', {story})
    }
});

router.put('/:id', async (req, res) => {
    try{
        let story = await Story.findById(req.params.id).lean();
        if(!story){res.render('errors/404')}
        else {
            story = await Story.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true});
        }
        res.redirect('/dashboard')
    }
    catch (e) {
        res.render('errors/404')
    }

});

// delete Stories

router.delete('/:id', async (req, res) => {
    try{
        await Story.remove({_id: req.params.id});
        res.redirect('/dashboard');
    }
    catch (e) {
        res.render('errors/500')
    }
});

router.get('/user/:userId', async (req, res) => {
    try{
        const stories = await Story.find({user: req.user.id, status: 'public'})
            .populate('user')
            .lean();
        res.render('stories/index', {stories, formatter, user: res.user})
    }
    catch (e) {
        res.render('errors/404')
    }
})
module.exports = router;