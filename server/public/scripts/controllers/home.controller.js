myApp.controller('HomeController', function($http, $location, UserService, $mdDialog){
    console.log('HomeController created');
    const vm = this;

    vm.showLogin = function(ev) {
        console.log('clicked login')
        $mdDialog.show({
          controller: 'LoginController as lc',
          templateUrl: '../views/modals/loginregister.dialog.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: self.customFullscreen 
        })
        .then(function() {
          console.log("yay")
        }, function() {
          console.log("nay")
        });
      };    
  

});