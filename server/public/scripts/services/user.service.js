myApp.service('UserService', function($http, $location, $mdDialog){
  let self = this;
  self.userObject = {};
  self.selectedUser = {list: []}
  self.user = {
    username: '',
    password: ''
  };
  self.userSkillArray = { list: [] };
  self.collaboratorProjects = {list: []};

  //Cancel modal
  self.cancel = function() {
    $mdDialog.cancel();
  };

  self.validateEmail= function(email) {
    var valEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return valEmail.test(email);
  }
   
  //adjusts ratings to text
self.findRating = function (rating) {
  if (rating == 1) {
    return "Beginner"
  } else if (rating == 2) {
    return "Intermediate"
  } else if (rating == 3) {
    return "Expert"
  }

}

  self.navbarPicture = {list: []};

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
      console.log('user info',response.data);
      self.userSkillArray.list.length = 0;
      for (let i = 0; i < response.data.length; i++) {
        self.userSkillArray.list.push({
          skill_name: response.data[i].skill_name,
          required_rating: self.findRating(response.data[i].skill_rating)
        }) 
      }      
      self.selectedUser.list = response.data;
      self.getCollaboratorProjects();
      console.log('skill array', self.userSkillArray);
      
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
        $http({
          method: 'PUT',
          url: '/collaborator/profilePicture',
          data: self.selectedUser.list[0]
        }).catch()
      });
    }
    openPicker();
  }

  self.getuser = function(){

    $http.get('/user').then(function(response) {
        if(response.data.username) {
            // user has a curret session on the server
            self.userObject.userName = response.data.username;
            self.userObject.id = response.data.id;
        } else {
            // user has no session, bounce them back to the login page
            $location.path("/home");
        }
    },function(response){
      $location.path("/home");
    });
  },

  self.logout = function() {
    self.selectedUser = {};
    self.userObject = {};
    $http.get('/user/logout').then(function(response) {
      $location.path("/home");
    });
  }

  //Get projects for a collaborator
  self.getCollaboratorProjects = function () {
    $http({
      method: 'GET',
      url: '/project/collaborator-projects',
      params: self.selectedUser.list[0]
    }).then(function (response) {
      self.collaboratorProjects.list = response.data;
    });
  };

  //Get user by ID (view other collaborator profiles)
  self.getUserById = function (id) {
    if(!id) {
      id = self.userObject.id
    }
    $http({
      method:'GET',
      url:'/collaborator/select/id',
      params: {id: id},
    }).then(function (response) {
      console.log('user', response.data);
      for (let i = 0; i < response.data.length; i++) {
        self.userSkillArray.list.push({
          skill_name: response.data[i].skill_name,
          required_rating: self.findRating(response.data[i].skill_rating)
        }) 
      } 
      
      self.selectedUser.list = response.data;
      self.getCollaboratorProjects();
    })
  };

  //Get collaborator picture for navbar
  self.getUserPicture = function () {
    $http({
      method: 'GET',
      url: '/collaborator/picture'
    }).then(function (response) {
      self.navbarPicture.list = response.data;
    });
  };

  //Modal for sending a message to collaborator
  self.contactCollaborator = function (ev) {
    $mdDialog.show({
      controller: 'UserController as vm',
      templateUrl: '../views/modals/contact-collaborator.dialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: self.customFullscreen
    })
  };

  //send message to project owner
  self.sendMessage = function (message, collaborator) {
    info = {
      message: message.message,
      id: collaborator.user_id,
    }

    $http({
      method: 'PUT',
      url: '/collaborator/message',
      data: info
    }).catch()
    
    self.cancel();
  }
});


