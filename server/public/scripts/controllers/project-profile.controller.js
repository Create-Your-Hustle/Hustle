myApp.controller('ProjectProfileController', function(UserService, ProjectService, $mdDialog){
    console.log('ProjectProfileController created');
    const self = this;

    self.ProjectService = ProjectService;

    ProjectService.getProjects();

    self.projectArray = ProjectService.projectArray

    self.contactProjectOwner = ProjectService.contactProjectOwner
    self.uploadProjectPicture = ProjectService.uploadProjectPicture

      self.sendMessage = function(message){
          console.log('message: ', message);
          
      }


});
