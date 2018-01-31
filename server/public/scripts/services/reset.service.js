myApp.service('ResetService', function ($http, $location) {
    console.log('ResetService Loaded');
    const self = this;

    self.sendReset = function(email) {
        console.log('email: ', email);
        $http({
            method: 'PUT',
            url: '/reset',
            data: email
          }).then(function (response) {
            console.log('response', response);
          })
    };

    self.setNewPassword = function(user) {
        console.log('button clicked');
        if (user.password == '') {
            console.log('you must enter a password');            
        } else if (user.password === user.password_confirm) {
            console.log('passwords match');            
        } else {
            console.log('please enter a valid password');            
        }
        
    }
});
