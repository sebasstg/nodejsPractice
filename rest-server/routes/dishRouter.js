var express= require('express');
var bodyParser=require('body-parser');
//db
var mongoose=require('mongoose');
var Dishes=require('../model/dishes');

var dishRouter= express.Router();
// body parser
dishRouter.use(bodyParser.json());

dishRouter.route('/')
    .get(function (req,res,next) {
        Dishes.find({}, function (err,dishes) {
           if(err) throw err;
            res.json(dishes);
        });
    })
    .post(function (req,res,next) {
        var dish=req.body;
        
        Dishes.create(dish,function (err,dish) {
            if(err) throw  err;
            console.log('Dish created');

            var id=dish._id;

            res.writeHead(200,{'Content-Type':'text/plain'});

            res.end('added the dish with id: '+id);
        });
        
    })
    .delete(function (req,res,next) {
        Dishes.remove({}, function (err,resp) {
            if(err) throw err;
            res.json(resp);
        })
    });

dishRouter.route('/:dishId')
    .get(function (req,res,next) {
        Dishes.findById(req.params.dishId,function (err,dish) {
            if(err) throw  err;

            res.json(dish);
        });
    })
    .put(function (req,res,next) {
        Dishes.findByIdAndUpdate(req.params.dishId,{$set:req.body},{new:true},function (err,dish) {
            if(err) throw err;

            res.json(dish);
        });

    })
    .delete(function (req,res,next) {

        Dishes.findByIdAndRemove(req.params.dishId,function (err,resp) {
            if(err) throw err;

            res.json(resp);
        })
    });

dishRouter.route('/:dishId/comments')
    .get(function (req,res,next) {
        Dishes.findById(req.params.dishId, function (err,dish) {
           if(err) throw err;
            res.json(dish.comments);
        });
    })
    .post(function (req, res, next) {
        Dishes.findById(req.params.dishId, function (err, dish) {
            if (err) throw err;
            dish.comments.push(req.body);
            dish.save(function (err, dish) {
                if (err) throw err;
                console.log('Updated Comments!');
                res.json(dish);
            });
        });
    })
    .delete(function (req, res, next) {
        Dishes.findById(req.params.dishId, function (err, dish) {
            if (err) throw err;
            for (var i = (dish.comments.length - 1); i >= 0; i--) {
                dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save(function (err, result) {
                if (err) throw err;
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end('Deleted all comments!');
            });
        });
    });

dishRouter.route('/:dishId/comments/:commentId')
    .get(function (req, res, next){
        Dishes.findById(req.params.dishId,function (err,dish) {
            if(err) throw  err;

            var comment=dish.comments.id(req.params.commentID);

            res.json(comment);

        });
    })
    .put(function (req, res, next) {
        // We delete the existing commment and insert the updated
        // comment as a new comment
        Dishes.findById(req.params.dishId, function (err, dish) {
            if (err) throw err;
            dish.comments.id(req.params.commentId).remove();
            dish.comments.push(req.body);
            dish.save(function (err, dish) {
                if (err) throw err;
                console.log('Updated Comments!');
                res.json(dish);
            });
        });
    })
    .delete(function (req, res, next) {
        Dishes.findById(req.params.dishId, function (err, dish) {
            dish.comments.id(req.params.commentId).remove();
            dish.save(function (err, resp) {
                if (err) throw err;
                res.json(resp);
            });
        });
    });

module.exports=dishRouter;