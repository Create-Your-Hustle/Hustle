myApp.controller('NavBarController', function NavBarController($mdDialog, UserService) {
    var self = this
    self.UserService = UserService;
    self.selectedUser = UserService.selectedUser
    var originatorEv;

    this.openMenu = function ($mdMenu, ev) {
        originatorEv = ev;
        $mdMenu.open(ev);
    };

    originatorEv = null;

    //UserService.getProfilePic();
});