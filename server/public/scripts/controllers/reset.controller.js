myApp.controller('ResetController', function(ResetService, $mdDialog){
    const self = this;

    self.ResetService = ResetService;

    self.sendReset = ResetService.sendReset;

    self.setNewPassword = ResetService.setNewPassword;

    self.passwordVerification = function(user) {
        
    };

    self.cancel = ResetService.cancel;
});