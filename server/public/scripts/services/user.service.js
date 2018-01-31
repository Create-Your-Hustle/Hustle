myApp.service('UserService', function($http, $location){
  console.log('UserService Loaded');
  var self = this;
  self.userObject = {};
  self.selectedUser = {list: []}
  self.user = {
    username: '',
    password: ''
  };

  self.getUser = function (username) {
    if(!username) {
      username = self.userObject.userName
    }
    $http({
      method:'GET',
      url:'/collaborator/select',
      params: {name: username},
    }).then(function (response) {
      console.log('response', response);
      self.selectedUser.list = response.data;
    })
  };

  self.editUser = function (change) {
    $http({
      method: 'PUT',
      url: '/collaborator/username',
      data: change,
    }).then(function (response){
      self.getUser(self.userObject.userName)
    })
  }

  self.getuser = function(){
    console.log('UserService -- getuser');
    $http.get('/user').then(function(response) {
        if(response.data.username) {
            // user has a curret session on the server
            self.userObject.userName = response.data.username;
            console.log('UserService -- getuser -- User Data: ', self.userObject.userName);
        } else {
            console.log('UserService -- getuser -- failure');
            // user has no session, bounce them back to the login page
            $location.path("/home");
        }
    },function(response){
      console.log('UserService -- getuser -- failure: ', response);
      $location.path("/home");
    });
  },

  self.logout = function() {
    console.log('UserService -- logout');
    $http.get('/user/logout').then(function(response) {
      console.log('UserService -- logout -- logged out');
      $location.path("/home");
    });
  }
});
