var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var dboper = require('./operations');

var url = 'mongodb://localhost:27017/conFusion';
var collectionDishes = "dishes";

MongoClient.connect(url, function (err, db) {

    console.log("conectandose");
    assert.equal(null, err);
    console.log("conectado");

    dboper.insertDocument(db, {name: "Vadonut", description: "Test"}, collectionDishes, function (result) {
        console.log("insertando");

        console.log(result.ops);

        dboper.findDocuments(db, collectionDishes, function (docs) {
            console.log("buscando");
            console.log(docs);
            dboper.updateDocument(db, {name: "Vadonut"}, {description: "Updated Test"}, collectionDishes, function (result) {
                console.log("update");
                console.log(result.result);

                dboper.findDocuments(db,collectionDishes,function (docs) {
                   console.log("busqueda");
                    console.log(docs);

                    db.dropCollection(collectionDishes, function (result) {
                        console.log("drop");
                        console.log(result);
                        db.close();
                    });
                });
            });
        });

    });


});
