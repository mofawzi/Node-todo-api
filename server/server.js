require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const port = process.env.PORT;

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();


app.use(bodyParser.json());

// Todos routes

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then(doc => res.send(doc), e => res.status(400).send(e));
});
+
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, e => res.status(400).send(e))
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findById(id).then(todo => {
    if(!todo){
      res.status(404).send();
    }

    res.status(200).send({todo});
  }).catch(e => res.status(400).send());
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
    console.log('ID is not valid!');
  }
  Todo.findByIdAndRemove(id).then(todo => {
    if(!todo){
      return res.status(404).send();
    }

    res.status(200).send({todo});
  }).catch(e => res.status(400).send());
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
    console.log('ID is not valid!');
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate(id, {$set: body}, {new: true}).then(todo => {
    if(!todo){
      return res.status(404).send();
    }
    res.status(200).send({todo});
  }).catch(e => res.status(400).send());
});


// Users routes

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  })
  .then(token => res.header('x-auth', token).send(user))
  .catch(e => res.status(400).send(e));
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then(token => res.header('x-auth', token).send(user));
  }).catch(e => ers.status(400).send());
});

app.listen(port, () => console.log(`Sterted up at port: ${port}`));

module.exports = {app};
