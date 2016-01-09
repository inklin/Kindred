var models = require('../models/index')
var faker = require('faker')
var bcrypt        = require('bcrypt');

var accounts = []
var persons = []
var digests = []
var updates = []
var digestUpdates = []
var sections = []


bcrypt.genSalt(10, function(err, salt){
  bcrypt.hash('password', salt, function(err, res){
    // create 5 people and accounts 

    for (var i = 0; i < 5; i++ ){
      models.Account.create({
        username: faker.internet.userName(),
        password: res,
        avatarUrl: faker.image.imageUrl()
      }).then(function(user){
        accounts.push(user)
        if (accounts.length === 5){
          createPeople()
          createUpdates()
        }
      }, function(err){
        console.log('ACCOUNT CREATION ERROR \n\n\n\n')
        console.log(err)
      })
    }
  })
})

function createPeople(){
  accounts.forEach(function(acc){
    models.Person.create({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        AccountId: acc.id
      }).then(function(person){
        persons.push(person)
        if (persons.length === 5){
          createDigests()
        }
      }, function(err){
        console.log('PERSON CREATION ERROR\n\n\n\n')
        console.log(err)
      })
  })
}

function createDigests(){
  persons.forEach(function(person){
    models.Digest.create({
      PersonId: person.id,
      sentAt: Date.now()
    }).then(function(digest){
      digests.push(digest)
      if (digests.length === 5 && updates.length === 5){
        createDigestUpdates()
      }
    }, function(err){
      console.log('DIGEST CREATION ERROR\n\n\n\n')
    })
  })
}

function createUpdates(){
  accounts.forEach(function(acc){
    models.Update.create({
      AccountId: acc.id,
      draft: false,
    }).then(function(update){
      updates.push(update)
      if ( updates.length === 5 ) {
        createSections()
      }
      if (digests.length === 5 && updates.length === 5 ){
        createDigestUpdates()
      }
    }, function(err){
      console.log('Update CREATION ERROR\n\n\n\n')
    })
  })
}

function createSections(){
  accounts.forEach(function(acc, index){
    for (var i = 0; i < 3; i++ ){
      models.Section.create({
        AccountId: acc.id,
        title: faker.lorem.words(5).join(' '),
        intro: faker.lorem.sentence(),
        body: faker.lorem.paragraphs(2),
        imageUrl: faker.image.city(),
        UpdateId: updates[index].id
      }).then(function(section){
        sections.push(section)
      }, function(err){
        console.log('SECTION CREATION ERROR\n\n\n\n')
      })
    }
  })
}

function createDigestUpdates(){
  updates.forEach(function(update){
    digests.forEach(function(digest){
      models.DigestUpdate.create({
        UpdateId: update.id,
        DigestId: digest.id,
        sendAs: 'full'
      })
    })
  })
}