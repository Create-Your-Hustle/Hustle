myApp.controller('ProjectSearchController', function(UserService, ProjectService, skillFilter){
    console.log('ProjectSearchController created');
    const self = this;

    //TODO - change this to ProjectService.projectSearchArray after search functionality is complete
    self.projectSearchArray = ProjectService.projectArray;
    self.skillArray = ProjectService.skillArray;

    ProjectService.getSkills();
    ProjectService.getProjects();

    //filter logic
    self.filteredProjects = [];
    self.parametersChanged = function (skills) {
        console.log(skills);
        self.filteredProjects = skillFilter(self.projectSearchArray.list, skills)
        console.log('EVENTS', self.filteredProjects);
    }


});