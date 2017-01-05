var baseUrl = require('../config').baseUrl;

module.exports = function(app) {
  app.factory('wrAuth', ['$http', '$q', function($http, $q) {
    return {
      removeToken: function() {
        this.token = null;
        this.user_name = null;
        $http.defaults.headers.common.token = null;
        window.localStorage.token = '';
      },
      saveToken: function(token) {
        this.token = token;
        $http.defaults.headers.common.token = token;
        console.log($http.defaults.headers.common.token);
        window.localStorage.token = token;
        return token;
      },
      getToken: function() {
        this.token || this.saveToken(window.localStorage.token);
        return this.token;
      },
      getUsername: function() {
        return $q((resolve, reject) => {
          if (this.user_name) return resolve(this.user_name);
          if (!this.getToken()) return reject(new Error('nos authtoken'));
          $http.get(baseUrl + 'authenticate')
          .then((res) => {
            this.username = res.data.user_name;
            resolve(res.data.user_name);
          }, reject);
        });
      }
    };
  }]);
};
