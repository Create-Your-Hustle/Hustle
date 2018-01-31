myApp.controller('ResetController', function(ResetService, $mdDialog){
    console.log('ResetController created');
    const self = this;

    self.ResetService = ResetService

    self.sendReset = ResetService.sendReset
});