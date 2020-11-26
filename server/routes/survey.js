let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport-local');

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

// connect to the Survey Model
let Survey = require('../models/survey');

let surveyController = require('../contrllers/survey')

// GET Router for the Survey List page - READ - Operation
router.get('/', surveyController.displaySurveyPage);

// GET Router for the Survey List page - READ - Operation
router.get('/', surveyController.displayUserSurveyPage);





// GET Router for displaying the Add page - CREATE Operation
router.get('/add', requireAuth, surveyController.displayAddPage);

// POST Router for proccing the Add page - CREATE Operation
router.post('/add', requireAuth, surveyController.processAddPage);

// GET Router for displaying the Edit page - UPDATE Operation
router.get('/edit/:id', requireAuth, surveyController.displayEditPage);


// POST Router for proccing the Edit page - UPDATE Operation
router.post('/edit/:id', requireAuth, surveyController.processEditPage);

// GET to perform Deletion - DELETE Operation
router.get('/delete/:id', requireAuth, surveyController.performDeletion);



module.exports = router;