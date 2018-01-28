myApp.service('ProjectService', function ($http, $location, $mdDialog) {
    console.log('ProjectService Loaded');
    const self = this;

    self.projectArray = { list: [] };

    //Modal for sending a message to project owners
    self.contactProjectOwner = function(ev) {
      console.log('button Clicked');
      $mdDialog.show({
        controller: 'ProjectProfileController as vm',
        templateUrl: '../views/modals/contactprojectowner.dialog.html',
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
    }






  });
  