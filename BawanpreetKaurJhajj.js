var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/* Creating database */
MongoClient.connect(url, function(err, db) {
if (err) throw err;
console.log("Database created!");
db.close();
});

/* Creating collections*/
MongoClient.connect(url, function(err, db) {
if (err) throw err;
var dbo = db.db("TaxiCompany");
dbo.createCollection("pickup_point", function(err, res) {
if (err) throw err;
console.log("Collection created!");
db.close();
});
});

MongoClient.connect(url, function(err, db) {
if (err) throw err;
var dbo = db.db("TaxiCompany");
dbo.createCollection("destination", function(err, res) {
if (err) throw err;
console.log("Collection created!");
db.close();
});
});

MongoClient.connect(url, function(err, db) {
if (err) throw err;
var dbo = db.db("TaxiCompany");
dbo.createCollection("customer", function(err, res) {
if (err) throw err;
console.log("Collection created!");
db.close();
});
});


/* Inserting documents into collections */

MongoClient.connect(url, function(err, db) {
if (err) throw err;
var dbo = db.db("TaxiCompany");
var myobj = [
{ pickpoint_id: '512', address:'Highway 71', city:'Toronto'},
{ pickpoint_id: '601', address:'Lowstreet 4', city:'Mississauga'},
{ pickpoint_id: '615', address:'Sky st 331', city:'Brampton'},
{ pickpoint_id: '657', address:'Park Lane 38', city:'Toronto'},
{ pickpoint_id: '701', address:'Sideway 1633', city:'Toronto'},
];
dbo.collection("pickup_point").insertMany(myobj, function(err, res) {
if (err) throw err;
console.log("Number of documents inserted: " + res.insertedCount);
db.close();
});
});

MongoClient.connect(url, function(err, db) {
if (err) throw err;
var dbo = db.db("TaxiCompany");
var myobj = [
{ dest_id: '210', address:'Green Grass 1', city:'Mississauga'},
{ dest_id: '215', address:'Ocean blvd 2', city:'Mississauga'},
{ dest_id: '220', address:'Main Road 989', city:'Toronto'},
{ dest_id: '225', address:'Central st 954', city:'Toronto'},
{ dest_id: '230', address:'Mountain 21', city:'Toronto'},
];
dbo.collection("destination").insertMany(myobj, function(err, res) {
if (err) throw err;
console.log("Number of documents inserted: " + res.insertedCount);
db.close();
});
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("TaxiCompany");
  var myobj = [
   	{ customer_id:'110',firstName: 'Satvir',lastName:'Brar',phone:'4372346420',address:'7047 Chigwel crt', city:'Mississauga'},
	{ customer_id:'117',firstName: 'Harpreet',lastName:'Bains',phone:'6420437234',address:'27 Harwick dr', city:'Mississauga'},
	{ customer_id:'380',firstName: 'Jagdeep',lastName:'Virk', phone:'2344372064',address:'220 Wexford road', city:'Brampton'},
	{ customer_id:'471',firstName: 'Rajwinder',lastName:'Kaur', phone:'2337642044',address:'209 Jane Street', city:'Toronto'},
	{ customer_id:'511',firstName: 'Bawanpreet',lastName:'Jhajj', phone:'9052346411',address:'3771 Morning Star Dr',city:'Mississauga'}

  ];
  dbo.collection("customer").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});


/* Reading Collections after Inserting documents */
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("TaxiCompany");
  dbo.collection("pickup_point").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("TaxiCompany");
  dbo.collection("destination").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("TaxiCompany");
  dbo.collection("customer").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});


/*Updating Collections */

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("TaxiCompany");
  var myquery = {pickpoint_id: "657"};
  var newvalues = {$set: {city:"Vaughan"} };
  dbo.collection("pickup_point").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(res.result.nModified + " document(s) updated");
    db.close();
  });
});


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("TaxiCompany");
  var myquery = ({$and :[{dest_id: "225"},{address:"Central st 954"}]});
  var newvalues = {$set: {city:"Scarborough"} };
  dbo.collection("destination").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(res.result.nModified + " document(s) updated");
    db.close();
  });
});


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("TaxiCompany");
  var myquery = {lastName: /^B/ };
  var newvalues = {$set: {city:"Etobicoke"} };
  dbo.collection("customer").updateMany(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(res.result.nModified + " document(s) updated");
    db.close();
  });
});

/* Deleting Collections */
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("TaxiCompany");
  var myquery = { lastName: /^B/ };
  dbo.collection("customer").deleteMany(myquery, function(err, obj) {
    if (err) throw err;
    console.log(obj.result.n + " document(s) deleted");
    db.close();
  });
});