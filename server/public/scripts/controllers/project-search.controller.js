myApp.controller('ProjectSearchController', function(UserService, ProjectService){
    console.log('ProjectSearchController created');
    const self = this;

    //TODO - change this to ProjectService.projectSearchArray after search functionality is complete
    self.projectSearchArray = ProjectService.projectArray;
    self.skillArray = ProjectService.skillArray;

    ProjectService.getSkills();
    ProjectService.getProjects();

});