myApp.controller('ProjectProfileController', function(UserService, ProjectService, $mdDialog, $routeParams){
    console.log('ProjectProfileController created');
    const self = this;

    self.ProjectService = ProjectService;


    ProjectService.getProjects();
    ProjectService.getProjectProfile($routeParams.id);
    ProjectService.getProjectSkills($routeParams.id);
    ProjectService.getProjectCollaborators($routeParams.id)

    self.projectSkillArray = ProjectService.projectSkillArray
    self.projectArray = ProjectService.projectArray
    self.projectProfile = ProjectService.projectProfile

    self.contactProjectOwner = ProjectService.contactProjectOwner
    self.uploadProjectPicture = ProjectService.uploadProjectPicture
    self.sendMessage = ProjectService.sendMessage



});
