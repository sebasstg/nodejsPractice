var express = require('express');
var bodyParser = require('body-parser');

var mongoose=require('mongoose');
var Leadership=require('../model/leadership');


var leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')

    .get(function (req, res, next) {
        Leadership.find({},function (err,leadership) {
            if(err) throw err;

            res.json(leadership);
        })
    })
    .post(function (req,res,nect) {
        Leadership.create(req.body,function (err,leadership) {
            if(err) throw err;
            res.writeHead(200,{'Content-Type':'text/plain'});

            res.end('added the leadershio with id: '+leadership._id);
        });
    })
    .delete(function (req, res, next) {
        Leadership.remove({},function (err,resp) {
            if(err) throw err;
            res.json(resp);
        });
    });

leaderRouter.route('/:id')
    .get(function (req, res, next) {

        Leadership.findById(req.params.id,function (err,leadership) {
            if(err) throw err;
            res.json(leadership);
        });
    })

    .put(function (req, res, next) {
        Leadership.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true},function (err,leadership) {
            if(err) throw err;
            res.json(leadership);
        })
    })

    .delete(function (req, res, next) {
        Leadership.findByIdAndRemove(req.params.id,function (err,resp) {
            if(err) throw err;
            req.json(resp);
        });
    });

module.exports=leaderRouter;