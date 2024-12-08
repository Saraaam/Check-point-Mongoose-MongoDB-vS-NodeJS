
//Connect to the database in your app file (e.g., server.js):

const mongoose = require('mongoose');
require('dotenv').config();



console.log("MONGO_URI:", process.env.MONGO_URI);



mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Connection error:', err));

//Define the Person Schema
//Create a schema and model:

const { Schema, model } = require('mongoose');

const personSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: [String],
});

const Person = model('Person', personSchema);

//Create and Save a Record
const createAndSavePerson = (done) => {
    const newPerson = new Person({
      name: 'John Doe',
      age: 25,
      favoriteFoods: ['Pizza', 'Burger'],
    });
  
    newPerson.save((err, data) => {
      if (err) return done(err);
      done(null, data);
    });
  };
  
  //Create Many Records

  const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (err, data) => {
      if (err) return done(err);
      done(null, data);
    });
  };
  
//Use model.find() to Search
  const findPeopleByName = (personName, done) => {
    Person.find({ name: personName }, (err, data) => {
      if (err) return done(err);
      done(null, data);
    });
  };


  //Use model.findOne() to Find a Match
  const findOneByFood = (food, done) => {
    Person.findOne({ favoriteFoods: food }, (err, data) => {
      if (err) return done(err);
      done(null, data);
    });
  };

  
//Use model.findById()
const findPersonById = (personId, done) => {
    Person.findById(personId, (err, data) => {
      if (err) return done(err);
      done(null, data);
    });
  };
  
  //Perform Classic Updates
  const findEditThenSave = (personId, done) => {
    Person.findById(personId, (err, person) => {
      if (err) return done(err);
  
      person.favoriteFoods.push('hamburger');
      person.save((err, updatedPerson) => {
        if (err) return done(err);
        done(null, updatedPerson);
      });
    });
  };

  //Perform Updates Using findOneAndUpdate
  const findAndUpdate = (personName, done) => {
    Person.findOneAndUpdate(
      { name: personName },
      { age: 20 },
      { new: true },
      (err, updatedPerson) => {
        if (err) return done(err);
        done(null, updatedPerson);
      }
    );
  };


  //Delete a Document by ID
  const deleteById = (personId, done) => {
    Person.findByIdAndRemove(personId, (err, deletedPerson) => {
      if (err) return done(err);
      done(null, deletedPerson);
    });
  };


 // Delete Many Documents
  const removeManyPeople = (done) => {
    Person.deleteMany({ name: 'Mary' }, (err, result) => {
      if (err) return done(err);
      done(null, result);
    });
  };
    

//Chain Search Query Helpers
  const queryChain = (done) => {
    Person.find({ favoriteFoods: 'burritos' })
      .sort('name')
      .limit(2)
      .select('-age')
      .exec((err, data) => {
        if (err) return done(err);
        done(null, data);
      });
  };
  