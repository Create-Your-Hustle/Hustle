myApp.controller('UserController', function(UserService, ProjectService) {
  console.log('UserController created');
  let self = this;
  self.userService = UserService;
  self.userService = ProjectService;
  self.userObject = UserService.userObject;
  self.selectedUser = UserService.selectedUser
  self.isEditing = {}
  self.skillslist = UserService.skillslist
  self.collaboratorProjects = ProjectService.collaboratorProjects;

  self.getUser = UserService.getUser
  self.editUser = UserService.editUser
  self.editUserPreferences = UserService.editUserPreferences
  self.deleteSkill = UserService.deleteSkill
  self.getSkills = UserService.getSkills
  self.addSkill = UserService.addSkill
  self.uploadProfilePicture = UserService.uploadProfilePicture
  self.getCollaboratorProjects = ProjectService.getCollaboratorProjects;

  self.editUsername = function (value) {
    console.log(value)
    self.isEditing.username = false;
    self.editUser(value);
  }

  self.editPreferences = function (pref) {
    self.isEditing.preferences = false
    self.editUserPreferences(pref)
  }

  self.getUser()
  self.getSkills()
  self.getCollaboratorProjects();



});
