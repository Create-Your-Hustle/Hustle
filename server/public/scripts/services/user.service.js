myApp.service('UserService', function($http, $location){
  console.log('UserService Loaded');
  let self = this;
  self.userObject = {};
  self.selectedUser = {list: []}
  self.user = {
    username: '',
    password: ''
  };
  self.skillslist = {list:[]}

  self.deleteSkill = function (user) {
    $http({
      method: 'DELETE',
      url: 'collaborator/skill',
      params: user,
    }).then(function (resposne) {
      self.getUser();
    })
  };

  self.getSkills = function () {
    $http({
      method: 'GET',
      url: 'project/skillList',
    }).then( function (response){
      self.skillslist.list = response.data
    })
  }

  self.addSkill = function (skill) {
    $http({
      method: 'POST',
      url: 'collaborator/skill',
      data: skill
    }).then( function (response) {
      self.getUser()
    })
  }

  self.getUser = function (username) {
    if(!username) {
      username = self.userObject.userName
    }
    $http({
      method:'GET',
      url:'/collaborator/select',
      params: {name: username},
    }).then(function (response) {
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

  self.editUserPreferences = function (pref) {
    $http({
      method: 'PUT',
      url: 'collaborator/preferences',
      data: pref,
    }).then(function (response) {
      self.getUser(self.userObject.userName)
    })
  }

  self.getuser = function(){

    $http.get('/user').then(function(response) {
        if(response.data.username) {
            // user has a curret session on the server
            self.userObject.userName = response.data.username;
        } else {
            // user has no session, bounce them back to the login page
            $location.path("/home");
        }
    },function(response){
      $location.path("/home");
    });
  },

  self.logout = function() {
    $http.get('/user/logout').then(function(response) {
      $location.path("/home");
    });
  }
});
