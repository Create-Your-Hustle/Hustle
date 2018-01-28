myApp.controller('ProjectProfileController', function(UserService, ProjectService){
    console.log('ProjectProfileController created');
    const self = this;

    self.ProjectService = ProjectService;


    self.projectArray = ProjectService.projectArray
    ProjectService.getProjects();
});