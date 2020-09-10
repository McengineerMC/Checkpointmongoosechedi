const express = require("express");
const router = express.Router();
let Person = require('../models/Person');

//Create and Save a Record of a Model
router.post('/addperson',(req, res) => {

    const {name,age,favoriteFoods} = req.body;
    const newUser = new Person ({ name,age,favoriteFoods});
    newUser.save()
        .then((newUser) => res.send(newUser))
        .catch(err => console.log(err));
})

//Create Many Records with model.create()
router.post('/addmanyperson',(req, res) => {
    const arrayOfPeople = req.body.arrayOfPeople

                 Person.create(arrayOfPeople)
                 .then((doc) => res.send(doc))
                 .catch(err => console.log(err))
});
//Use model.find() to Search Your Database
router.get('/findperson/:name',(req, res) => {
    const {name} = req.params;
    Person.find({name})
    .then((doc) => res.send(doc))
    .catch(err => console.log(err))
    })
//Use model.findOne() to Return a Single Matching Document from Your Database
router.get('/finoneperson/:food',(req, res) => {
        const {food} = req.params
        Person.findOne({favoriteFoods:food})
        .then((doc) => res.send(doc))
        .catch(err => console.log(err))
        })


//Use model.findById() to Search Your Database By _id
router.get('/findaperson/:_id',(req, res) => {
  const personId = req.params._id
            Person.findById({_id:personId })
            .then((doc) => res.send(doc))
            .catch(err => console.log(err))
            })
// Perform Classic Updates by Running Find, Edit, then Save
router.post('/findeditsaveaperson/:_id',(req, res) => {
  const personId = req.params._id
  const [foodtoadd] = req.body.favoriteFoods//set food to "humberger"
            Person.findById({_id:personId },(err,data)=>{
              if (err) {console.log(err)}else{data.favoriteFoods.push(foodtoadd)
              data.save()
            res.send(data)};
              });
              
          });
//Perform New Updates on a Document Using model.findOneAndUpdate()
router.put('/findupdateperson/:name',(req, res) => {
    var ageToSet = req.body.age//set age to 20
    var personName = req.params.name;
    Person.findOneAndUpdate(
        {name: personName},
        {$set: {age:ageToSet}},{new : true})
        .then((doc) => res.send(doc))
        .catch(err => console.log(err))
      });
//Delete One Document Using model.findByIdAndRemove
      router.delete('/findremoveperson/:_id',(req, res) => {
        const personId = req.params._id
        Person.findByIdAndRemove({_id:personId })
          .then((doc) => res.send(doc))
          .catch(err => console.log(err))

          });
//MongoDB and Mongoose - Delete Many Documents with model.remove()
          router.delete('/removeperson/:name',(req, res) => {
            var nameToRemove = req.params.name;

          Person.remove({name: nameToRemove})
          .then((doc) => res.send(doc))
          .catch(err => console.log(err))
        });
//Chain Search Query Helpers to Narrow Search Results 
        router.get('/searchperson/:food',(req, res) => {
           const {food} = req.params;
            Person.find({favoriteFoods:food}).sort({name : "desc"}).limit(2).select("-age").exec((err, data) => {
                err ? res.status(400).send(err):res.send(data);
                console.log(data);
            });
        });


       module.exports = router;