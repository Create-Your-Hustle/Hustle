myApp.controller('UserController', function (UserService, CollaboratorService, ProjectService, AutoCompleteService, $routeParams) {
  let self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.AutoCompleteService = AutoCompleteService;
  self.selectedUser = UserService.selectedUser;
  self.isEditing = {}
  self.skillslist = UserService.skillslist;
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
  self.searchTextChange = AutoCompleteService.searchTextChange;
  self.selectedItemChange = AutoCompleteService.selectedItemChange;
  self.querySearch = AutoCompleteService.querySearch;
  self.loadAll = AutoCompleteService.loadAll;
  self.querySearchSkills = AutoCompleteService.querySearchSkills;
  self.loadAllSkills = AutoCompleteService.loadAllSkills;
  self.userSkillArray = UserService.userSkillArray;
  
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
  if (!$routeParams.id) {
    self.getUser();
  } else {
    self.getUserById($routeParams.id)
  }



  self.simulateQuery = false;
  self.isDisabled = false;
  self.querySearch = AutoCompleteService.querySearch;
  self.querySearchSkills = AutoCompleteService.querySearchSkills;
  self.selectedItemChange = AutoCompleteService.selectedItemChange;
  self.searchTextChange = AutoCompleteService.searchTextChange;
  self.states = AutoCompleteService.states;
  self.skills = AutoCompleteService.skills



});
