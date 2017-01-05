module.exports = exports = function(app) {
  require('./mainPortalDirective.js')(app);
  require('./srListItem.js')(app);
  require('./sqForm.js')(app);
};
