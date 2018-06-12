const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user')

// Todo.remove({}).then(res => console.log(res));


// Todo.findOneAndRemove()

Todo.findByIdAndRemove('5b1ff0fab29b1b107d2d6631').then(todo => console.log(todo));
