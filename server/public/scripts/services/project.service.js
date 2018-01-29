myApp.service('ProjectService', function ($http, $location, $mdDialog, $routeParams) {
    console.log('ProjectService Loaded');
    const self = this;

    self.projectArray = { list: [] };
    self.skillArray = { list: [] };
    self.projectSkillArray = { list:[] };
    self.projectProfile = { list:[] };
    self.imageUrl = {};

    //Modal for sending a message to project owners
    self.contactProjectOwner = function(ev) {
      console.log('button Clicked');
      $mdDialog.show({
        controller: 'ProjectProfileController as vm',
        templateUrl: '../views/modals/contact-project-owner.dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: self.customFullscreen 
      })     
    };
    
    //Get all projects
    self.getProjects = function () {
      $http({
        method:'GET',
        url:'/project'
      }).then(function (response) {
        console.log('response', response);
        self.projectArray.list = response.data;
      })
    };

    //gets project info for project profile view
    self.getProjectProfile = function(id) {
      $http({
        method:'GET',
        url:'/project/profile/' + id
      }).then(function (response) {
        console.log('ROUTE PARAMS RESPONSE', response);
        self.projectProfile.list = response.data;
      })
    }

    self.findRating = function(rating) {
      if (rating == 1) {
        return "../views/images/skill-one.jpg"
      } else if ( rating == 2 ) {
        return "../views/images/skill-two.jpg"
      } else if ( rating == 3 ) {
        return "../views/images/skill-three.jpg"
      }

    }

        //Get all projects
        self.getProjectSkills = function (id) {
          self.projectSkillArray.list = [];
          $http({
            method:'GET',
            url:'/project/skills/' + id
          }).then(function (response) {
            console.log('response', response);
            console.log('project skills ', self.projectSkillArray);
            for (let i = 0; i < response.data.length; i++) {
              self.projectSkillArray.list.push({
                skill_name: response.data[i].skill_name,
                required_rating: self.findRating(response.data[i].required_rating)
              })
            }
          })
        }
    self.uploadProjectPicture = function (project) {
      console.log('uploadProjectPicture')
      var fsClient = filestack.init('AR2OVvMAHTTiTRo7bG05Vz');
      function openPicker() {
        fsClient.pick({
          fromSources: ["local_file_system", "url", "imagesearch", "facebook", "instagram", "googledrive", "dropbox", "evernote", "flickr", "box", "github", "webcam", "video", "audio"],
          maxSize: 102400000,
          maxFiles: 5,
          minFiles: 1,
          imageDim: [400, 250]
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
      $http({
        method:'GET',
        url:'/project/search',
        data: searchParamsObject,
      }).then(function (response) {
        console.log('response', response);
        self.projectArray.list = response.data;
      })
    };

    //get skill list for select
    self.getSkills = function() {
      $http({
        method: 'GET',
        url: '/project/skillList',
      }).then(function(response){
        console.log(response.data);
        self.skillArray.list = response.data;
      })
    }

  });
  