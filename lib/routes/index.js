var accounts  = require('./accounts');
var comments  = require('./comments');
var contacts  = require('./contacts');
var digests   = require('./digests');
var people    = require('./people');
var sections  = require('./sections');
var updates   = require('./updates');
var staticFiles = require('./static-files');

module.exports = [].concat(accounts, comments, contacts, digests, people, sections, updates, staticFiles);
