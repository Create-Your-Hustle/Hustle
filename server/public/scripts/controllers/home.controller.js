myApp.controller('HomeController', function ($http, $location, UserService, $mdDialog, $mdSticky) {
  const vm = this;

  vm.showLogin = function (ev) {
    $mdDialog.show({
      controller: 'LoginController as lc',
      templateUrl: '../views/modals/loginregister.dialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: self.customFullscreen
    })
      .then(function () {
      }, function () {
      });
  };

  vm.stickyHeader = function(ev) {

  }

  vm.carousel = [
    { src: '../assets/squarespace/carousel1.png' },
    { src: '../assets/squarespace/carousel2.png' },
    { src: '../assets/squarespace/carousel3.png' },
    { src: '../assets/squarespace/carousel4.png' }
  ];

  
}); 