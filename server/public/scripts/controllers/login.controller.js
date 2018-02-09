myApp.controller('LoginController', function($http, $location, $mdDialog, UserService) {
  console.log('LoginController created');
  var vm = this;
  vm.user = UserService.user;
  vm.validateEmail = UserService.validateEmail
  vm.message = '';
  vm.loginMessage = 'Please login using your e-mail address';
  vm.registerMessage= 'Welcome! Please register using your e-mail address to get started!';

  //   vm.cancel = function(){
  //     $modalInstance.close();
  //  }
  // Note to self: had $modalInstance as a controller function dependency on Line 1, trying
  // to figure out how to make the modal close when you click the x.

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
          vm.cancel();
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
      // vm.message = "Choose a username and password!";
      alert("Choose a username and password!");
      // $mdDialog.show(
      //   $mdDialog.alert()
      //     .parent(angular.element(document.querySelector('#popupContainer')))
      //     .clickOutsideToClose(true)
      //     .title('Hold on!')
      //     .textContent('Did you enter an e-mail and a password?')
      //     .ariaLabel('Fill Out E-mail and Password')
      //     .ok('Got it!')
      //     .targetEvent(ev)
    
    } else if (!(vm.validateEmail(vm.user.username))) {
      alert("Please input a valid e-mail address (_____@___.___")
    } else if (vm.user.password !== vm.user.checkPassword) {
      alert("Passwords do not match! Please try again.")
    }
      else if (vm.user.password.length < 6){
      alert("Password needs to be at least 6 characters long.")
      }
      else {
      console.log('LoginController -- registerUser -- sending to server...', vm.user);
      $http.post('/register', vm.user).then(function(response) {
        console.log('LoginController -- registerUser -- success');
        alert ("You have been registered! Please log-in with your new credentials.")
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

  vm.cancel = function() {
    $mdDialog.cancel();
  };
});
