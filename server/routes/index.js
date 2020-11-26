let express = require('express');
let router = express.Router();

let indexController = require('../contrllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

// GET home page
router.get('/home', indexController.displayHomePage);

// GET survey page
router.get('/survey', indexController.displaySurveyPage);

// GET survey page
router.get('/userSurvey', indexController.displayUserSurveyPage);

// GET contact page
router.get('/contact', indexController.displayContactInfoPage);

/* ******************************************************************** */
// below is the Authentication code
/* GET Route for displaying the Login page */
router.get('/login', indexController.displayLoginPage);

/* POST Route for processing the Login page */
router.post('/login', indexController.processLoginPage);

/* GET Route for displaying the Register page */
router.get('/register', indexController.displayRegisterPage);

/* POST Route for processing the Register page */
router.post('/register', indexController.processRegisterPage);

/* GET to perform UserLogout */
router.get('/logout', indexController.performLogout);




module.exports = router;
