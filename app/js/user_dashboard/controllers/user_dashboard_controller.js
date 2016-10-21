module.exports = exports = function(app) {
  app.controller('UserDashboardController', ['userDashboardResource', function(UserDashResource) {
    this.userObject = {
      id: 2, // 7
      userName: '',
      userEmail: '',
      userPhone: '',
      userZip: '',
      memberSince: '',
      autos: [],
      serviceQuotes: []
    };
    this.errors = [];

    var userDash = new UserDashResource(this.userObject, this.errors);

    this.getUserInfo = userDash.getUserInfo.bind(userDash);

    this.logUser = function() {
      console.log('user object from controller');
      console.log(this.userObject);
    };
  }]);
};
