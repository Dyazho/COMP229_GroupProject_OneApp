let express = require('express');
let reouter = express.Router();
let mongoose = require('mongoose');

// let jwt = require('jsonwebtoken');   // implement jwt if we are going to convert to ANGULAR

// create reference to the model
let Survey = require('../models/survey');
let userSurvey = require('../models/user');

module.exports.displaySurveyPage = (req, res, next) => {

        Survey.find((err, surveyList) => {
            if (err) {
                return console.error(err);
            }
            else {
                //console.log(SurveyList);
                res.render('survey/list',
                    {
                        title: 'Survey',
                        surveyList: surveyList,
                        Email: req.user ? req.user.email: '',
                        //username: req.user ? req.user.username: '',
                        displayName: req.user ? req.user.displayName : ''
                    });
            }
        });
    }

module.exports.displayUserSurveyPage = (req, res, next) => {

    Survey.find((err, surveyList) => {
        if (err) {
            return console.error(err);
        }
        else {
            //console.log(SurveyList);
            res.render('survey/userSurvey',
                {
                    title: 'Survey',
                    surveyList: surveyList,
                    Email: req.user ? req.user.email: '',
                    //username: req.user ? req.user.username: '',
                    displayName: req.user ? req.user.displayName : ''
                });
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('survey/add',
        {
            title: 'Add Survey',
            Email: req.user ? req.user.email: '',
            username: req.user ? req.user.username: '',
            displayName: req.user ? req.user.displayName : ''
        });
};


module.exports.processAddPage = (req, res, next) => {
    let newSurvey = Survey({
        "Name": req.body.Name,
        "Gender": req.body.Gender,
        "Answer1": req.body.Answer1,
        "Answer2": req.body.Answer2,
        "Answer3": req.body.Answer3,
        "Email": req.user.email
    });

    Survey.create(newSurvey, (err, Survey) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the survey list
            res.redirect('/survey-list');
        }
    });
};


module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //show the edit view
            res.render('survey/edit',
                {
                    title: 'Edit Survey',
                    survey: surveyToEdit,
                    Email: req.user ? req.user.email: '',
                    //username: req.user ? req.user.username: '',
                    displayName: req.user ? req.user.displayName : ''
                })
        }
    });
};


module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedSurvey = Survey({
        "_id": id,
        "Name": req.body.Name,
        "Gender": req.body.Gender,
        "Answer1": req.body.Answer1,
        "Answer2": req.body.Answer2,
        "Answer3": req.body.Answer3,
        "Email": req.user.email
    });

    Survey.updateOne({ _id: id }, updatedSurvey, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the survey list
            res.redirect('/survey-list');
        }
    });
};


module.exports.performDeletion = (req, res, next) => {
    let id = req.params.id;

    Survey.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the survey list
            res.redirect('/survey-list');
        }
    });
};