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
});
