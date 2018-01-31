myApp.controller('UserController', function(UserService) {
  console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.selectedUser = UserService.selectedUser
  self.isEditing = {}

  self.getUser = UserService.getUser
  self.editUser = UserService.editUser

  self.editUsername = function (value) {
    self.isEditing.username = false;
    self.userObject.userName = value.username;
    self.editUser(value);
  }

  self.getUser()


});
