myApp.controller('UserController', function(UserService, CollaboratorService, ProjectService, $routeParams) {
  let self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.selectedUser = UserService.selectedUser
  self.isEditing = {}
  self.skillslist = UserService.skillslist
  self.collaboratorProjects = UserService.collaboratorProjects;

  self.getUser = UserService.getUser
  self.editUser = UserService.editUser
  self.editUserPreferences = UserService.editUserPreferences
  self.deleteSkill = UserService.deleteSkill
  self.getSkills = UserService.getSkills
  self.addSkill = UserService.addSkill
  self.uploadProfilePicture = UserService.uploadProfilePicture
  self.getCollaboratorProjects = UserService.getCollaboratorProjects;
  self.getUserById = UserService.getUserById;
  self.uploadProfilePicture = UserService.uploadProfilePicture;
  self.createProject = ProjectService.createProject;


  self.editUsername = function (value) {
    self.isEditing.username = false;
    self.editUser(value);
  };

  self.editPreferences = function (pref) {
    self.isEditing.preferences = false
    self.editUserPreferences(pref)
  };


  self.getSkills();

  //check if navigating to /user (on login to direct to logged in profile, or if navigating to a /user/:id through search etc)
  if(!$routeParams.id){
    self.getUser();
  }else{
    self.getUserById($routeParams.id)
  }




});
