myApp.controller('ProjectProfileController', function(UserService, ProjectService, $mdDialog){
    console.log('ProjectProfileController created');
    const self = this;

    self.ProjectService = ProjectService;

    ProjectService.getProjects();

    self.projectArray = ProjectService.projectArray

    // self.contactProjectOwner = ProjectService.contactProjectOwner
    self.contactProjectOwner = function(ev) {
        console.log('button Clicked');
        $mdDialog.show({
          controller: 'ProjectProfileController as vm',
          templateUrl: '../views/modals/loginregister.dialog.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: self.customFullscreen 
        })
        
      }
      self.showPrompt = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        $mdDialog.prompt()
          .title('What would you name your dog?')
          .textContent('Bowser is a common name.')
          .placeholder('Dog name')
          .initialValue('Buddy')
          .targetEvent(ev)
          .required(true)
          .ok('Okay!')
          .cancel('I\'m a cat person');
    
        $mdDialog.show(confirm).then(function(result) {
          $scope.status = 'You decided to name your dog ' + result + '.';
        }, function() {
          $scope.status = 'You didn\'t name your dog.';
        });
      };
});
