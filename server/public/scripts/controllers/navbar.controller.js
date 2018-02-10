myApp.controller('NavBarController', function NavBarController($mdDialog, UserService) {
    var self = this
    self.UserService = UserService;
    self.selectedUser = UserService.selectedUser;
    self.getUserPicture = UserService.getUserPicture;
    self.navbarPicture = UserService.navbarPicture;
    var originatorEv;

    this.openMenu = function ($mdMenu, ev) {
        originatorEv = ev;
        $mdMenu.open(ev);
    };

    originatorEv = null;

    self.getUserPicture();
});