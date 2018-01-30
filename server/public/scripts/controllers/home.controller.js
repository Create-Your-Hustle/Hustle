myApp.controller('HomeController', function ($http, $location, UserService, $mdDialog, $mdSticky) {
  console.log('HomeController created');
  const vm = this;

  vm.showLogin = function (ev) {
    console.log('clicked login')
    $mdDialog.show({
      controller: 'LoginController as lc',
      templateUrl: '../views/modals/loginregister.dialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: self.customFullscreen
    })
      .then(function () {
        console.log("yay")
      }, function () {
        console.log("nay")
      });
  };

  vm.stickyHeader = function(ev) {
    console.log ('making header sticky')

  }

  vm.carousel = [
    { src: '../assets/squarespace/carousel1.png' },
    { src: '../assets/squarespace/carousel2.png' },
    { src: '../assets/squarespace/carousel3.png' },
    { src: '../assets/squarespace/carousel4.png' }
  ];

  
}); 