const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('../models/paper');
const Paper = mongoose.model('Paper');
require('../models/account');
const Account = mongoose.model('Account');



const paperRouter = express.Router();

paperRouter.use(bodyParser.json());



paperRouter.route('/:account')
.post((req, res, next) => {
    Promise.all([
        Paper.create(req.body),
        Account.update(
            {"account":req.params.account},
            {$push:{"paper":req.body.paperid}}
        )
    ])
    .then((paper) => {
        console.log('Paper Created ', paper);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(paper);
    }, (err) => next(err))
    .catch((err) => next(err));
})


paperRouter.route('/GetPaper/:paperid')
.get((req,res,next) => {
    Paper.find({"paperid":req.params.paperid})
    .then((paper) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(paper);
    }, (err) => next(err))
    .catch((err) => next(err));
})

paperRouter.route('/ModifyPaper/:paperid')
.get((req,res,next) => {
    Paper.find({"paperid":req.params.paperid})
    .then((paper) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(paper);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    // 修改paper的Meta信息 ==> 而post('/')是创建新的paper
    Paper.update(
        {"paperid":req.params.paperid},
        {
            $set:
            {
                courseNO:req.body.courseNO,
                courseName:req.body.courseName,
                courseDate:req.body.courseDate,
                examiners:req.body.examiners,
                fileName:req.body.fileName,
                modifyDate:req.body.modifyDate
            }
        }
    )
    .then((paper) => {
        console.log('Paper Modify ', paper);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(paper);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /papers');
})
.delete((req, res, next) => {
    Paper.remove({"paperid":req.params.paperid})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});



paperRouter.route('/paperRemove/:paperid')
.delete((req, res, next) => {
    Paper.remove({"paperid":req.params.paperid})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});


module.exports = paperRouter;