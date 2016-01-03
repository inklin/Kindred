var models = require('../../models/index.js');

// MIGRATE add draft boolean
// get currentUser accountId
  // POST create new update w/ draft true
// PUT on 'send' update w/ draft false
// DELETE on 'cancel' or 'trash' only IF draft true
