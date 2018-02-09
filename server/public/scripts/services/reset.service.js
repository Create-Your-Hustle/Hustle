myApp.service('ResetService', function ($http, $location, $routeParams, $mdDialog) {
    console.log('ResetService Loaded');
    const self = this;

    self.cancel = function() {
        $mdDialog.cancel();
      };

    self.sendReset = function (email) {
        console.log('email: ', email);
        $http({
            method: 'PUT',
            url: '/reset',
            data: email
        }).then(function (response) {
            console.log('response', response);
        });

        self.cancel();
    };

    self.setNewPassword = function (user) {
        console.log('button clicked');
        if (user.password == '') {
            console.log('you must enter a password');
        } else if (user.password === user.password_confirm) {
            
            $http({
                method: 'PUT',
                url: '/reset/password',
                data: user,
                params: {
                    code: $routeParams.code
                }
            }).then(function (response) {
                console.log('response', response);
            })
        } else {
            console.log('please enter a valid password');
        }

    }
});
