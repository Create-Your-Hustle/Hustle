myApp.controller('UserController', function(UserService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.getUser = UserService.getUser
  vm.selectedUser = UserService.selectedUser

  vm.getUser()
  vm.deleteME()
});
