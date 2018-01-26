var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb://Kel:fZysrmG5F19XUjcN@kelgeekcreation-shard-00-00-ogo6n.mongodb.net:27017/test?ssl=true&replicaSet=KelGeekCreation-shard-0&authSource=admin";
MongoClient.connect(uri, function (err, db) {
  db.collection('inventory').insertMany([
    // MongoDB adds the _id field with an ObjectId if _id is not present
    {
      item: "journal", qty: 25, status: "A",
      size: { h: 14, w: 21, uom: "cm" }, tags: ["blank", "red"]
    },
    {
      item: "notebook", qty: 50, status: "A",
      size: { h: 8.5, w: 11, uom: "in" }, tags: ["red", "blank"]
    },
    {
      item: "paper", qty: 100, status: "D",
      size: { h: 8.5, w: 11, uom: "in" }, tags: ["red", "blank", "plain"]
    },
    {
      item: "planner", qty: 75, status: "D",
      size: { h: 22.85, w: 30, uom: "cm" }, tags: ["blank", "red"]
    },
    {
      item: "postcard", qty: 45, status: "A",
      size: { h: 10, w: 15.25, uom: "cm" }, tags: ["blue"]
    }
  ])
    .then(function (result) {
      // process result

      console.log('connect successfully');
      let cursor = db.collection('inventory').find({ size: { h: 8.5, w: 11, uom: "in" } });
      while (cursor.hasNext()) {
        print(tojson(cursor.next()));
      }
    })
  db.close();
});