const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('../models/question');
const Question = mongoose.model('Question');
require('../models/account');
const Account = mongoose.model('Account');
require('../models/paper');
const Paper = mongoose.model('Paper');


const questionRouter = express.Router();
questionRouter.use(bodyParser.json());




questionRouter.route('/')
.get((req,res,next) => {
    Question.find({})
    .then((question) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(question);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Question.create(req.body)
    .then((question) => {
        console.log('Question Created ', question);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(question);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /questions');
})
.delete((req, res, next) => {
    Question.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});





//questionRouter.route('/:qid/:uid') //当想要加入更多params的时候就用这个
questionRouter.route('/:qid')
.get((req,res,next) => {
    Question.findById(req.params.qid)
    .then((question) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Question.update(
        { qid:parseInt(req.params.qid)},
        { $set:
            {
                title:req.body.title,
                total:req.body.total,
                subquestion:req.body.subquestion
            }
          
        }
    )
    .then((question) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(question);
    }, (err) => next(err))
    .catch((err) => next(err));

})
.put((req, res, next) => {
    Question.findByIdAndUpdate(req.params.qid, {
        $set: req.body
    }, { new: true })
    .then((question) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(question);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Question.remove({"qid":parseInt(req.params.qid)})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


questionRouter.route('/comment/:qid')
.post((req, res, next) => {
    
    Question.update(
        { qid:parseInt(req.params.qid)},
        { $set:
            {
                comment:req.body
            }
          
        }
    )
    .then((question) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(question);
    }, (err) => next(err))
    .catch((err) => next(err));

})


questionRouter.route('/paperRemove/:paperid')
.delete((req, res, next) => {
    Question.remove({"paperid":req.params.paperid})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});





questionRouter.route('/getQuestion/:paperid')
.get((req, res, next) =>{
    console.log(req.params.paperid)
    Question.find({"paperid":req.params.paperid})
    .then((question) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(question);
    }, (err) => next(err))
    .catch((err) => next(err));
})



module.exports = questionRouter;