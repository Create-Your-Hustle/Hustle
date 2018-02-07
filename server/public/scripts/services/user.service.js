myApp.service('UserService', function($http, $location){
  console.log('UserService Loaded');
  let self = this;
  self.userObject = {};
  self.selectedUser = {list: []}
  self.user = {
    username: '',
    password: ''
  };

  self.validateEmail= function(email) {
    var valEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return valEmail.test(email);
  }
   

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
      self.getUser(self.userObject.username)
    })
  };

  self.editUserPreferences = function (pref) {
    $http({
      method: 'PUT',
      url: 'collaborator/preferences',
      data: pref,
    }).then(function (response) {
      self.getUser(self.userObject.username)
    })
  };

  self.uploadProfilePicture = function (profile) {
    var fsClient = filestack.init('AR2OVvMAHTTiTRo7bG05Vz');
    function openPicker() {
      fsClient.pick({
        fromSources: ["local_file_system", "url", "imagesearch", "facebook", "instagram", "googledrive", "dropbox", "evernote", "flickr", "webcam", "video", "audio"],
        maxSize: 102400000,
        maxFiles: 5,
        minFiles: 1,
        imageDim: [400, 250],
        transformations: {
          crop: {
            force: true,
            aspectRatio: 1
          }
        }
      }).then(function (response) {
        // declare this function to handle response
        self.selectedUser.list[0].user_picture = response.filesUploaded[0].url;
        console.log('Here we are', self.selectedUser.list[0])
        $http({
          method: 'PUT',
          url: '/collaborator/profilePicture',
          data: self.selectedUser.list[0]
        }).then(function (response) {
          console.log('response', response);
        })
      });
    }
    openPicker();
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
  };

  self.getUserById = function (id) {
    if(!id) {
      id = self.userObject.id
    }
    $http({
      method:'GET',
      url:'/collaborator/select/id',
      params: {id: id},
    }).then(function (response) {
      self.selectedUser.list = response.data;
    })
  };
});
