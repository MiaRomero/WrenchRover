
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('describeController', ['wrResource', function(Resource) {
    this.descriptions = [];
    this.errors = [];
    this.childrens = [];
    this.childrens0 = [];
    this.childrens1 = [];
    this.sibling = '100';
    var remote = new Resource(this.descriptions, this.errors, baseUrl + 'categories', { errMessages: { getAll: 'custome error message' } });

    var remoteChildren = new Resource(this.childrens, this.errors, baseUrl + 'categories', { errMessages: { getAll: 'custome error message' } });
    this.getAll = remote.getAll.bind(remote);

    var remoteChildren0 = new Resource(this.childrens0, this.errors, baseUrl + 'categories', { errMessages: { getAll: 'custome error message' } });

    var remoteChildren1 = new Resource(this.childrens1, this.errors, baseUrl + 'categories', { errMessages: { getAll: 'custome error message' } });


    this.getAll = remote.getAll.bind(remote);

    this.getChildren = remote.getChildren.bind(remoteChildren);

    this.getChildren0 = remote.getChildren0.bind(remoteChildren0);
    this.getChildren1 = remote.getChildren1.bind(remoteChildren1);

    console.log(this.childrens0);
    console.log(this.childrens1);
    // console.log(this.descriptions);

    this.getChildren1();
    this.getChildren0();
    this.getChildren();
    this.getAll();
    // this.getAll().then(function() {
    //
    // });
  }]);
};
