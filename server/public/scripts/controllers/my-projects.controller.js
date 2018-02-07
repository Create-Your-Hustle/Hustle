myApp.controller('MyProjectsController', function(UserService, ProjectService, $routeParams){
    console.log('MyProjectsController created');
    const self = this;

    self.ProjectService = ProjectService;

    //ProjectService.getMyProjects($routeParams.id);

});
