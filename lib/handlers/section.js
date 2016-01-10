var models          = require('../../models/index.js');
var fs              = require ('fs');
var AWS             = require('aws-sdk');

var BUCKET_NAME = 'lighthouse-kindred-app';
var IMAGE_PATH = 'https://s3-us-west-2.amazonaws.com/lighthouse-kindred-app/';

var s3 = new AWS.S3();

var createNewSection = function(req, reply) {

  var section = req.payload;
  var title = section.title;
  var intro = section.intro;
  var body = section.body;
  var file = section.file;

  if (file) {
    var result = uploadImage(file, reply);
    console.log("REsult is ", result);
  }
}

var uploadImage = function(file, reply) {
  var name = file.hapi.filename;
  var path = __dirname + "/../../temp/" + name;
  var temp = fs.createWriteStream(path);

  temp.on('err', function(err) {
    console.log(err);
  });

  file.pipe(temp);

  file.on('end', function(err) {

    var fileBuffer = fs.readFileSync(path);
    var metaData = 'image/jpeg';

    s3.putObject({
      Bucket: BUCKET_NAME,
      Key: name,
      Body: fileBuffer,
      ContentType: metaData
    }, function(err, res) {

      var fileUrl = IMAGE_PATH + name;

      fs.unlink(path, function(err){

        if (err) {
          console.log(err);
        } else {
          console.log("Image successfully uploaded to S3 and deleted from temp");
          console.log("Image url: ", fileUrl);
          return fileUrl;
        }

      });
    });

  });

}

module.exports = {
  'createNewSection': createNewSection
}
