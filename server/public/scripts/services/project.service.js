
myApp.service('ProjectService', function ($http, $location, $mdDialog, $routeParams) {
  const self = this;

  self.projectArray = { list: [] };
  self.skillArray = { list: [] };
  self.projectSkillArray = { list: [] };
  self.projectCollaboratorArray = { list: [] };
  self.projectCollaborationRequestArray = { list: [] }
  self.projectProfile = { list: [] };
  self.imageUrl = {};
  self.myProjectsArray = { list: [] };


  //Get all projects
  self.getProjects = function () {
    $http({
      method: 'GET',
      url: '/project'
    }).then(function (response) {
      self.projectArray.list = response.data;
    })
  };

  //gets project info for project profile view
  self.getProjectProfile = function (id) {
    $http({
      method: 'GET',
      url: '/project/profile/' + id
    }).then(function (response) {
      self.projectProfile.list = response.data;
    })
  }

  self.findRating = function (rating) {
    if (rating == 1) {
      return "Beginner"
    } else if (rating == 2) {
      return "Intermediate"
    } else if (rating == 3) {
      return "Expert"
    }

  }

  //Get all projects Skills
  self.getProjectSkills = function (id) {
    self.projectSkillArray.list = [];
    $http({
      method: 'GET',
      url: '/project/skills/' + id
    }).then(function (response) {
      for (let i = 0; i < response.data.length; i++) {
        self.projectSkillArray.list.push({
          skill_name: response.data[i].skill_name,
          required_rating: self.findRating(response.data[i].required_rating)
        })
      }
    })
  }

  //Get Project Collaborators
  self.getProjectCollaborators = function (id) {
    self.projectCollaboratorArray.list = [];
    $http({
      method: 'GET',
      url: '/project/project-collaborators/' + id
    }).then(function (response) {
      for (let i = 0; i < response.data.length; i++) {
        self.projectCollaboratorArray.list.push({
          display_name: response.data[i].display_name,
          user_project_role: response.data[i].user_project_role,
          user_id: response.data[i].id,
          user_picture: response.data[i].user_picture
        })
      }
    })
  }

  
  //Get Collaboration Requests
  self.getCollaborationRequests = function (id) {
    self.projectCollaborationRequestArray.list = [];
    $http({
      method: 'GET',
      url: '/project/collaboration-requests/' + id
    }).then(function (response) {
      for (let i = 0; i < response.data.length; i++) {
        self.projectCollaborationRequestArray.list.push({
          username: response.data[i].display_name,
          user_project_role: response.data[i].user_project_role,
          user_id: response.data[i].id,
          user_picture: response.data[i].user_picture
        })
      }
    })
  }


  self.uploadProjectPicture = function (project) {
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
        project.project_picture = response.filesUploaded[0].url;
        $http({
          method: 'PUT',
          url: '/project/projectPicture',
          data: project
        }).catch()
      });
    }
    openPicker();
  }



  self.getProjectSearchResult = function (searchParamsObject) {
    searchParamsObject.skills.push('');
    $http({
      method: 'GET',
      url: '/project/search',
      params: searchParamsObject,
    }).then(function (response) {
      self.projectArray.list = response.data;
    })
  };

  //get skill list for select
  self.getSkills = function () {
    $http({
      method: 'GET',
      url: '/project/skillList',
    }).then(function (response) {
      self.skillArray.list = response.data;
    })
  }

    //Modal for sending a message to project owners
    self.contactProjectOwner = function (ev) {
      $mdDialog.show({
        controller: 'ProjectProfileController as vm',
        templateUrl: '../views/modals/contact-project-owner.dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: self.customFullscreen
      })
    };

  //Cancel modal
  self.cancel = function() {
    $mdDialog.cancel();
  };

  //send message to project owner
  self.sendMessage = function (message, project) {
    info = {
      message: message.message,
      project_id: project.project_id,
      project_name: project.project_name,
      project_role: message.skill
    }

    $http({
      method: 'PUT',
      url: '/project/message',
      data: info
    }).catch()
    
    self.cancel();
  }

    //rate project Collaborator modal
    self.rateCollaborator = function (ev, collaborator) {
      
      $mdDialog.show({
        locals:{dataToPass: collaborator},
        controller: 'CollaboratorRatingController as vm',
        templateUrl: '../views/modals/rate-collaborator.dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: self.customFullscreen
      })
    }
  
    //submits collaborator ratings
    self.submitRatings = function(ratings, collaborator, project) {
      collaboratorRating = {
        rating: ratings,
        project: project.project_id,
        collaborator: collaborator.user_id
      }
      $http({
        method: 'PUT',
        url: '/project/collaboratorRatings',
        data: collaboratorRating
      }).catch();

      self.cancel();
    };

    //get list of projects for this user
    self.getMyProjects = function(user_id){
      $http({
        method: 'GET',
        url: '/project/myProjects/' + user_id,
      }).then(function (response){
        self.myProjectsArray.list = response.data;
      })
    }

    //Adds skill to a project
    self.addProjectSkill = function(skill, project) {
      projectSkill = {
        level: skill.level,
        skill: skill.skill[0],
        project: project
      }
      $http({
        method: 'POST',
        url: '/project/addProjectSkill',
        data: projectSkill
      }).then(function (response) {
        console.log('response', response);
        self.getProjectSkills($routeParams.id);
      })      
    }//End Add Skill

    self.createProject = function () {
      $http ({
      method: 'POST', 
      url: '/project',
    }).then (function (response) {
      $location.path('/projectprofile/'+response.data[0].project_id)
    })
  }

    //Adds Collaborator to a project
    self.acceptCollaboration = function(user, project) {
      collaborationRequest = {
        user: user.user_id,
        project: project,
      }
      $http({
        method: 'PUT',
        url: '/project/acceptCollaboration',
        data: collaborationRequest
      }).then(function (response) {
        self.getCollaborationRequests($routeParams.id)
        self.getProjectCollaborators($routeParams.id);
      })
    }

    //Declines collaboration request
    self.declineCollaboration = function(user, project) {   
      collaborationRequest = {
        user: user.user_id,
        project: project,
      }
      $http({
        method: 'PUT',
        url: '/project/declineCollaboration',
        data: collaborationRequest
      }).then(function (response) {
        self.getCollaborationRequests($routeParams.id)
      })

    }

    //Edits project name and description
    self.editProjectHead = function(project) {
      $http({
        method: 'PUT',
        url: '/project/nameAndBio',
        data: project,
      }).then(function (response){
        self.getProjectProfile(project.project_id)
      })      
    }//end edit project name and description

    //edits project preferences
    self.editProjectPreferences = function(project) {
      $http({
        method: 'PUT',
        url: '/project/preferences',
        data: project,
      }).then(function (response){
        self.getProjectProfile(project.project_id)
      })

    }//end edit project preferences

});
