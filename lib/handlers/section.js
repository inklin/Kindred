var models          = require('../../models/index.js');
var AWS             = require('aws-sdk');
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

module.exports = {
  'createNewSection': createNewSection
}
