myApp.controller('ResetController', function(ResetService, $mdDialog){
    console.log('ResetController created');
    const self = this;

    self.ResetService = ResetService;

    self.sendReset = ResetService.sendReset;

    self.setNewPassword = ResetService.setNewPassword;

    self.passwordVerification = function(user) {
        console.log(user);
        
    };

    self.cancel = ResetService.cancel;
});