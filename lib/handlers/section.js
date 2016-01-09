var models          = require('../../models/index.js');
var fs              = require ('fs');
var imageUploader   = require('./image-upload.js');

var createNewSection = function(req, reply) {

  var section = req.payload;
  var title = section.title;
  var intro = section.intro;
  var body = section.body;
  var file = section.file;

  if (file) {
    uploadTempFile(file, reply);
  }
}

var uploadTempFile = function(file, reply) {
  var name = file.hapi.filename;
  var path = __dirname + "/../../temp/" + name;
  var temp = fs.createWriteStream(path);

  temp.on('err', function(err) {
    console.log(err);
  });

  file.pipe(temp);
  file.on('end', function(err) {

    imageUploader.uploadFile(name);
    
    var result = {
      filename: name,
      headers: file.hapi.headers,
      path: path
    };

    reply({
      message: 'Temp image successfully uploaded',
      result: result
    });
  })
}

module.exports = {
  'createNewSection': createNewSection
}
