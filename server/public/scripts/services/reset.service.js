myApp.service('ResetService', function ($http, $location, $routeParams, $mdDialog) {
    const self = this;

    self.cancel = function() {
        $mdDialog.cancel();
      };

    self.sendReset = function (email) {
        $http({
            method: 'PUT',
            url: '/reset',
            data: email
        }).catch();
        self.cancel();
    };

    self.setNewPassword = function (user) {
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
            }).catch();
        } else {
            console.log('please enter a valid password');
        }

    }
});
