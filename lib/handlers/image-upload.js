var fs     = require ('fs');
var AWS    = require('aws-sdk');
var BUCKET_NAME = 'lighthouse-kindred-app';
var IMAGE_PATH = 'https://s3-us-west-2.amazonaws.com/lighthouse-kindred-app/';

var s3 = new AWS.S3();

// Region Name: US West (Oregon)
AWS.config.update({region: 'us-west-2'});

function uploadFile(fileName) {
  var filePath = __dirname + '/../../temp/' + fileName;
  var fileBuffer = fs.readFileSync(filePath);
  var metaData = 'image/jpeg';

  s3.putObject({
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: fileBuffer,
    ContentType: metaData
  }, function(err, res) {
    var fileUrl = IMAGE_PATH + fileName;
    console.log('Image uploaded successfully!');
    console.log('Uploaded file url is: ', fileUrl);
  })
}
