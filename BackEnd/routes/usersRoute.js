var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const child_process = require('child_process')

require('../models/user');
const User = mongoose.model('User')

var router = express.Router();
router.use(bodyParser.json());

const MSG_CODE = {
  SUCCESS: 0,
  FAILED: 1,
}

router.route('/login')
.post((req, res, next) => {
  User.find({ email: req.body.email })
  .then(users => {
    if (!users || users.length === 0) {
      const msg = {
        description: `User Doesn't Exist`,
        status: MSG_CODE.FAILED,
      }
      sendFailed(msg, res)
    } else {
      const user = users[0]
      const data = {
        ...user._doc,
        status: MSG_CODE.SUCCESS,
      }
      if (data.password !== req.body.password) {
        const msg = {
          description: `Password Doesn't Correct`,
          status: MSG_CODE.FAILED,
        }
        sendFailed(msg, res)
        return
      }
      sendSuccess(data, res)
    }
  })
})

router.route('/create')
.post((req, res, next) => {
  console.log(req.body)
  User
    .find({email: req.body.email})
    .then(users => {
      if (users.length === 0 || !users) {
        createUser(req.body, res)
      } else {
        const msg = {
          description: 'User Already Exist',
          status: MSG_CODE.FAILED,
        }
        sendFailed(msg, res)
      }
    })
    .catch(err => next(err))
})

router.route('/examine/:email')
.get((req, res, next) => {
  User.find({ email: req.params.email })
  .then(users => {
    if (!users || users.length === 0) {
      const msg = {
        description: `User Doesn't Exist`,
        status: MSG_CODE.FAILED,
      }
      sendFailed(msg, res)
    } else {
      const historys = users[0].historys
      sendSuccess(historys, res)
    }
  })
})
.post((req, res, next) => {
  User.find({ email: req.params.email })
  .then(users => {
    if (!users || users.length === 0) {
      const msg = {
        description: `User Doesn't Exist`,
        status: MSG_CODE.FAILED,
      }
      sendFailed(msg, res)
    } else {
      const user = users[0]
      const historys = user.historys
      const input = [req.body.BMI, req.body.weightGain, req.body.menstrualCycle, req.body.weight]
      // ../test/venv/bin/python ../test/method.py '{"input": [[${input}]]}'
      child_process.exec(`
        /usr/bin/python3 ../MachineLearning/method.py '{"input": [[${input}]]}'
      `, (error, stdout, stderr) => {
        console.log(stdout, stderr)
        const len = stdout.length
        let output = stdout.slice(2, len - 4)
        const examine_result = output.split(' ')
        console.log(examine_result)
        let val = Number(examine_result[0])
        val = Math.max(val - 0.45, 0.001) * 10 + ''
        // let randomMock = Math.random()
        historys.unshift({
          ...req.body,
          result: val,
          // result: randomMock,
        })
        User.updateOne(
          { email: req.params.email },
          {
            $set: {
              historys
            }
          }
        ).then(_ => {
          const data = {
            examine_result: val,
            // examine_result: randomMock,
            status: MSG_CODE.SUCCESS,
          }
          sendSuccess(data, res)
        })
      })
    }
  })
})

router.route('/delete/all')
.get((req, res, next) => {
  User.remove({})
  .then(user => {
    sendSuccess(user, res)
  })
})

const createUser = function(data, res) {
  User.create(data)
    .then(user => {
      console.log('User Created ', user)
      const payload = {
        ...user._doc,
        status: MSG_CODE.SUCCESS,
      }
      sendSuccess(payload, res)
    })
    .catch(err => console.log(err))
}

const sendSuccess = function(data, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json(data);
}
const sendFailed = function(msg, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.json(msg)
}
module.exports = router;
