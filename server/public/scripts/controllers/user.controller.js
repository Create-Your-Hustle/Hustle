myApp.controller('UserController', function(UserService) {
  console.log('UserController created');
  let self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.selectedUser = UserService.selectedUser
  self.isEditing = {}
  self.skillslist = UserService.skillslist


  self.getUser = UserService.getUser
  self.editUser = UserService.editUser
  self.editUserPreferences = UserService.editUserPreferences
  self.deleteSkill = UserService.deleteSkill
  self.getSkills = UserService.getSkills
  self.addSkill = UserService.addSkill

  self.editDisplayname = function (value) {
    console.log(value)
    self.isEditing.displayName = false;
    self.userObject.displayName = value.displayName;
    self.editUser(value);
  }

  self.editPreferences = function (pref) {
    self.isEditing.preferences = false
    self.editUserPreferences(pref)
  }

  self.getUser()
  self.getSkills()




});
