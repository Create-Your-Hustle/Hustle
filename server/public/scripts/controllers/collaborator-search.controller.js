myApp.controller('CollaboratorSearchController', function(UserService, CollaboratorService){
    console.log('CollaboratorSearchController created');
    const self = this;

    self.collaborators = CollaboratorService.collaborators;
});