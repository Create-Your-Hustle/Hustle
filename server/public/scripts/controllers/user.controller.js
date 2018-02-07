myApp.controller('UserController', function(UserService, CollaboratorService, $routeParams) {
  console.log('UserController created');
  let self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.selectedUser = UserService.selectedUser;
  self.isEditing = {};
  self.skillslist = UserService.skillslist;


  self.getUser = UserService.getUser;
  self.editUser = UserService.editUser;
  self.editUserPreferences = UserService.editUserPreferences;
  self.deleteSkill = UserService.deleteSkill;
  self.getSkills = UserService.getSkills;
  self.addSkill = UserService.addSkill;
  self.getUserById = UserService.getUserById;

  self.editUsername = function (value) {
    console.log(value)
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
    console.log('getting logged in profile')
    self.getUser();
  }else{
    self.getUserById($routeParams.id)
  }




});
