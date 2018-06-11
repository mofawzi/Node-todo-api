// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('5b1e718fb29b1b107d2d34c5')
  }, {
    $set: {
      completed: true
    }
  }, {
    returnOriginal: false
  }).then(res => console.log(res));

  // db.close();
});
