const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user')

var id = '5b1fbf09f77d5c603cf39caf';
if(!ObjectID.isValid(id)){
  console.log('ID not valid');
}

// Todo.find({
//   _id: id
// }).then(todos => console.log('Todos: ', todos));
//
// Todo.findOne({
//   _id: id
// }).then(todo => {
//  console.log('Todo: ', todo);
// });
//
// Todo.findById(id).then(todo => {
//   if(!todo){
//     return console.log('Id not found!');
//   }
//   console.log('Todo By Id: ', todo);
// }).catch(e => console.log(e));

User.findById('5b1fc9cab29b1b107d2d58f4').then(user => {
  if(!user){
      return console.log('User not found!');
  }
  console.log(JSON.stringify(user, undefined, 2));
}, e => console.log(e));
