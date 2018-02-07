
myApp.service('ProjectService', function ($http, $location, $mdDialog, $routeParams) {
  console.log('ProjectService Loaded');
  const self = this;

  self.projectArray = { list: [] };
  self.skillArray = { list: [] };
  self.projectSkillArray = { list: [] };
  self.projectCollaboratorArray = { list: [] };
  self.projectProfile = { list: [] };
  self.imageUrl = {};



  //Get all projects
  self.getProjects = function () {
    $http({
      method: 'GET',
      url: '/project'
    }).then(function (response) {
      console.log('response', response);
      self.projectArray.list = response.data;
    })
  };

  //gets project info for project profile view
  self.getProjectProfile = function (id) {
    $http({
      method: 'GET',
      url: '/project/profile/' + id
    }).then(function (response) {
      console.log('ROUTE PARAMS RESPONSE', response);
      self.projectProfile.list = response.data;
    })
  }

  self.findRating = function (rating) {
    if (rating == 1) {
      return "../views/images/skill-one.jpg"
    } else if (rating == 2) {
      return "../views/images/skill-two.jpg"
    } else if (rating == 3) {
      return "../views/images/skill-three.jpg"
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
      console.log('response', response);
      for (let i = 0; i < response.data.length; i++) {
        self.projectCollaboratorArray.list.push({
          username: response.data[i].username,
          user_project_role: response.data[i].user_project_role,
          user_id: response.data[i].id
        })
      }
      console.log('project collaborators ', self.projectCollaboratorArray);
    })
  }

  self.uploadProjectPicture = function (project) {
    console.log('uploadProjectPicture')
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
        console.log('IS THIS EVEN WORKING', project);
        $http({
          method: 'PUT',
          url: '/project/projectPicture',
          data: project
        }).then(function (response) {
          console.log('response', response);
        })
      });
    }
    openPicker();
  }



  self.getProjectSearchResult = function (searchParamsObject) {
    console.log('project search', searchParamsObject)
    searchParamsObject.skills.push('');
    $http({
      method: 'GET',
      url: '/project/search',
      params: searchParamsObject,
    }).then(function (response) {
      console.log('response', response);
      self.projectArray.list = response.data;
    })
  };

  //get skill list for select
  self.getSkills = function () {
    $http({
      method: 'GET',
      url: '/project/skillList',
    }).then(function (response) {
      console.log(response.data);
      self.skillArray.list = response.data;
    })
  }

    //Modal for sending a message to project owners
    self.contactProjectOwner = function (ev) {
      console.log('button Clicked');
      $mdDialog.show({
        controller: 'ProjectProfileController as vm',
        templateUrl: '../views/modals/contact-project-owner.dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: self.customFullscreen
      })
    };



  //send message to project owner
  self.sendMessage = function (message, project) {
    console.log('message: ', message);
    console.log('project: ', project);
    info = {
      message: message.message,
      project_id: project.project_id,
      project_name: project.project_name
    }
    console.log('info: ', info);

    $http({
      method: 'PUT',
      url: '/project/message',
      data: info
    }).then(function (response) {
      console.log('response', response);
    })
  }

    //rate project Collaborator modal
    self.rateCollaborator = function (ev, collaborator) {
    
      console.log('button Clicked');
      console.log(collaborator);
      
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
      console.log("ratings", ratings);
      console.log("collaborator", collaborator);
      console.log('project', project);
      collaboratorRating = {
        rating: ratings,
        project: project.project_id,
        collaborator: collaborator.user_id
      }
      $http({
        method: 'PUT',
        url: '/project/collaboratorRatings',
        data: collaboratorRating
      }).then(function (response) {
        console.log('response', response);
      })
    }

    //Adds skill to a project
    self.addProjectSkill = function(skill, project) {
      projectSkill = {
        level: skill.level,
        skill: skill.skill[0],
        project: project
      }
      console.log(projectSkill);
      
      $http({
        method: 'POST',
        url: '/project/addProjectSkill',
        data: projectSkill
      }).then(function (response) {
        console.log('response', response);
      })
      
      
    }


});
