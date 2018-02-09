myApp.controller('MyProjectsController', function(UserService, ProjectService, $routeParams){
    const self = this;

    self.ProjectService = ProjectService;

    //ProjectService.getMyProjects($routeParams.id);

});
