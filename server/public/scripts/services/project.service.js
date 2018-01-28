myApp.service('ProjectService', function ($http, $location) {
    console.log('ProjectService Loaded');
    const self = this;

    self.projectArray = { list: [] };


    // self.contactProjectOwner = function(ev) {
    //   console.log('button Clicked');
    //   $mdDialog.show({
    //     controller: 'LoginController as lc',
    //     templateUrl: '../views/modals/loginregister.dialog.html',
    //     parent: angular.element(document.body),
    //     targetEvent: ev,
    //     clickOutsideToClose:true,
    //     fullscreen: self.customFullscreen 
    //   })
      
    // }

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
  