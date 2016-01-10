var models          = require('../../models/index.js');
var AWS             = require('aws-sdk');
var Boom            = require('boom');
var fs              = require('fs');

var BUCKET_NAME = 'lighthouse-kindred-app';
var IMAGE_PATH = 'https://s3-us-west-2.amazonaws.com/lighthouse-kindred-app/';

var s3 = new AWS.S3();

var createNewSection = function(req, reply) {
  var currentUser = req.currentUser;
  var section = req.payload;
  var file = section.file;
  var fileName = file.hapi.filename;
  var path = __dirname + "/../../temp/" + fileName;
  var writeStream = fs.createWriteStream(path);

  file.pipe(writeStream);
  file.on('end', function(){

    var fileBuffer = fs.readFileSync(path);

    s3.putObject({
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: fileBuffer,
      ContentType: 'image/jpeg'
    }, function(){

      fs.unlink(path, function() {
        var imageUrl = IMAGE_PATH + fileName;

        models.Section.create({
          title: section.title,
          intro: section.intro,
          body: section.body,
          imageUrl: imageUrl,
          AccountId: currentUser.id
        }).then(function(section){
          reply({
            statusCode: 200,
            message: 'Successfully created section',
            data: section
          });
        }, function(err){
          reply({
            statusCode: 400,
            message: 'Failed to ceate section',
            data: err.message
          });
        });
      });
    });
  });

}

var deleteSection = function(req, reply) {
  var sectionId = req.params.id;
  var currentUser = req.currentUser;

  models.Section.findById(sectionId)
    .then(function(section){

      if (section && section.AccountId === currentUser.id) {
        section.destroy().then(function(){
          reply({
            statusCode: 200,
            message: 'Section has been successfully deleted',
            sectionId: sectionId
          });
        }, function(){
          reply(Boom.badRequest('Failed to delete section'));
        });
      } else if (section) {
        reply(Boom.unauthorized('Unauthorized to delete section'));
      } else {
        reply(Boom.notFound('Unable to retrieve section'));
      }

    }, function(err){
      reply(Boom.badRequest('Failed to retrieve Section', err));
    });
}

var updateSection = function(req, reply) {
  var currentUser = req.currentUser;
  var section = req.payload;
  var file = section.file;
  var fileName = file.hapi.filename;

  models.Section.findById(section.id).then(function(sect){

    if (fileName) {
      // Upload the file to S3 then update the Section
      var path = __dirname + "/../../temp/" + fileName;
      var writeStream = fs.createWriteStream(path);

      file.pipe(writeStream);
      file.on('end', function(){

        var fileBuffer = fs.readFileSync(path);

        s3.putObject({
          Bucket: BUCKET_NAME,
          Key: fileName,
          Body: fileBuffer,
          ContentType: 'image/jpeg'
        }, function(){

          fs.unlink(path, function() {
            var imageUrl = IMAGE_PATH + fileName;

            sect.update({
              title: section.title,
              intro: section.intro,
              body: section.body,
              imageUrl: imageUrl
            }).then(function(sect){
              reply({
                statusCode: 200,
                message: 'Section successfully updated',
                data: sect
              });
            }, function(err){
              reply(Boom.badRequest('Failed to update section', err.message));
            })
          });
        });
      });

    } else {
      // Update the section
      sect.update({
        title: section.title,
        intro: section.intro,
        body: section.body
      }).then(function(sect) {
        reply({
          statusCode: 200,
          message: 'Section successfully updated',
          data: sect
        });
      }, function(err) {
        reply(Boom.badRequest('Failed to update section', err.message));
      });
    }

  }, function(err) {
    reply(Boom.notFound('Failed to find section'));
  });
}

module.exports = {
  'createNewSection': createNewSection,
  'deleteSection': deleteSection,
  'updateSection': updateSection
}
