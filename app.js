const express = require('express');
const app = express();
const port = 3000;
const {MongoClient, ObjectId} = require('mongodb');
const uri = 'mongodb+srv://users:users@cluster0.iwzvh.mongodb.net/firstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.urlencoded());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  client.connect(async (err) => {
    if (err) throw err;
    const usersCollection = client.db('firstDatabase').collection('users');
    await usersCollection.find({}).toArray( (err, userData) => {
      if (err) throw err;
      res.render('./index', {userData});
    });
  });
});

app.post('/add', (req, res) => {
  client.connect(async (err) => {
    if (err) throw err;
    const usersCollection = client.db('firstDatabase').collection('users');
    await usersCollection.insertOne(req.body, (err, result) => {
      if (err) throw err;
      if (result) {
        console.log(result.insertedCount + ` document inserted successfully!`);
      } else {
        console.log(`Error in inserting the document`);
      }
      res.redirect('/');
    });
  });
});

app.get('/delete/:userId', (req, res) => {
  client.connect(async (err) => {
    if (err) throw err;
    const usersCollection = client.db('firstDatabase').collection('users');
    await usersCollection.deleteOne({'_id': new ObjectId(req.params.userId)}, (err, result) => {
      if (err) throw err;
      if (result) {
        console.log(result.deletedCount + ' document deleted successfully!');
      } else {
        console.log('Error in deleting the document');
      }
      res.redirect('/');
    });
  });
});

app.post('/edit', (req, res) =>{
  client.connect(async (err) => {
    if (err) throw err;
    const usersCollection = client.db('firstDatabase').collection('users');
    await usersCollection.updateOne({'_id': new ObjectId(req.body._id)}, {$set: {'name':req.body.name, 'email':req.body.email, 'contact':req.body.contact}}, (err, result) => {
      if (err) throw err;
      if (result) {
        console.log(result.updatedCount + ' document updated successfully!');
      } else {
        console.log('Error in updating the document');
      }
      res.redirect('/');
    });
  });
});

app.listen(port);