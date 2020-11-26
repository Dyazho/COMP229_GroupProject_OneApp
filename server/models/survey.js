let mongoose = require('mongoose');

// create a model class
let surveyModel = mongoose.Schema({
    Name: String,
    Gender:String ,
    Answer1: String, 
    Answer2: String,
    Answer3: String,
    Email: String
},
{
    collection: "survey"
});

module.exports = mongoose.model('Survey', surveyModel);