myApp.controller('LoginController', function($http, $location, $mdDialog, UserService) {
    console.log('LoginController created');
    var vm = this;
    vm.user = UserService.user;
    vm.message = '';

    vm.login = function() {
      console.log('LoginController -- login');
      if(vm.user.username === '' || vm.user.password === '') {
        vm.message = "Enter your username and password!";
      } else {
        console.log('LoginController -- login -- sending to server...', vm.user);
        $http.post('/', vm.user).then(function(response) {
          if(response.data.username) {
            console.log('LoginController -- login -- success: ', response.data);
            // location works with SPA (ng-route)
            $location.path('/user'); // http://localhost:5000/#/user
          } else {
            console.log('LoginController -- login -- failure: ', response);
            vm.message = "Wrong!!";
          }
        }).catch(function(response){
          console.log('LoginController -- registerUser -- failure: ', response);
          vm.message = "Wrong!!";
        });
      }
    };

    vm.registerUser = function() {
      console.log('LoginController -- registerUser');
      if(vm.user.username === '' || vm.user.password === '') {
        vm.message = "Choose a username and password!";
      } else {
        console.log('LoginController -- registerUser -- sending to server...', vm.user);
        $http.post('/register', vm.user).then(function(response) {
          console.log('LoginController -- registerUser -- success');
          $location.path('/home');
        }).catch(function(response) {
          console.log('LoginController -- registerUser -- error');
          vm.message = "Please try again."
        });
      }
    }
    vm.facebookLogin = function () {
      console.log('in facebookLogin')
      $http ({
        method: 'GET',
        url: '/user/facebook'
      }).then(function(response){
        console.log('facebook', response)
      })
    }
    //function for opening password reset modal
    vm.passwordReset = function (ev) {
      console.log('clicked reset')
      $mdDialog.show({
        controller: 'ResetController as vm',
        templateUrl: '../views/modals/password-reset.dialog.html',
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
});
