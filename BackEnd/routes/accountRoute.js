const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('../models/account');
const Account = mongoose.model('Account');

const accountRouter = express.Router();

accountRouter.use(bodyParser.json());




accountRouter.route('/')
.get((req,res,next) => {
    Account.find({})
    .then((account) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(account);
    }, (err) => next(err))
    .catch((err) => next(err));
})

// post用来注册账号
.post((req, res, next) => {

    Account.find({"account":req.body.account})
    .then((account)=>{
        if(account.length==0){

            Account.create(req.body)
            .then((account) => {
                console.log('Account Created ', account);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(account);
            }, (err) => next(err))
            .catch((err) => next(err));

        }else{
            res.statusCode = 403;
            res.end('This account already exist!');
        }
 


    })


})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /accounts');
})
.delete((req, res, next) => {
    Account.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});





//accountRouter.route('/:qid/:uid') //当想要加入更多params的时候就用这个
accountRouter.route('/:account')
.get((req,res,next) => {

    Account.find({"account":req.params.account})
    .then((account) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(account);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Account.update(
        { qid:parseInt(req.params.qid)},
        { $set:
            {
                title:req.body.title,
                total:req.body.total,
                subaccount:req.body.subaccount
            }
          
        }
    )
    .then((account) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(account);
    }, (err) => next(err))
    .catch((err) => next(err));

})
.put((req, res, next) => {
    Account.findByIdAndUpdate(req.params.qid, {
        $set: req.body
    }, { new: true })
    .then((account) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(account);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Account.remove({"qid":parseInt(req.params.qid)})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


// 删除paper的时候需要post来更新account.paper数据
accountRouter.route('/paperRemove/:paperid')
.delete((req, res, next) => {
    // 定义一个辅助的删除函数

    Account.find(
        { paper:req.params.paperid},
    )
    .then((account) => {
        account.forEach((acc)=>{
            acc.paper.splice(acc.paper.indexOf(req.params.paperid),1)
            console.log(acc)
            Account.update(
                {account:acc.account},
                {$set:{paper:acc.paper}}
            ).then(()=>{
                
            })
        })
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(account);
    }, (err) => next(err))
    .catch((err) => next(err));

})



// 邀请该成员进入新的team
accountRouter.route('/inviteTeam/:account/:paperid')
.get((req,res,next)=>{
    Account.find({"account":req.params.account})
    .then((account) => {
        if(account.length==0){
            res.statusCode = 403;
            res.end('This account does not exist!');
        }else{
            if(account[0].paper.indexOf(req.params.paperid)==-1){
                Account.update(
                    {account:account[0].account},
                    {$push:{paper:req.params.paperid}}
                ).then(()=>{
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(account);
                })
            }else{
                res.statusCode = 403;
                res.end('Already invite!');
            }
                


            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})


// 登陆的时候检查账号信息
accountRouter.route('/checkAccount/:account/:password')
.get((req,res,next)=>{
    Account.find({"account":req.params.account,
                "password":req.params.password})
    .then((account) => {
        if(account.length==0){
            res.statusCode = 403;
            res.end('This account does not exist!');
        }else{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(account);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports = accountRouter;