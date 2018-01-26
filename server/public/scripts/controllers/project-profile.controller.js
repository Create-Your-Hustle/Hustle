app.controller('ProjectProfileController', function(UserService, ProjectService){
    console.log('ProjectProfileController created');
    const self = this;

    self.ProjectService = ProjectService;

    ProjectService.getProjects();
});