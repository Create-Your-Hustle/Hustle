myApp.controller('NavBarController', function NavBarController($mdDialog, CollaboratorService) {
    var originatorEv;

    this.openMenu = function ($mdMenu, ev) {
        originatorEv = ev;
        $mdMenu.open(ev);
    };

    originatorEv = null;
});