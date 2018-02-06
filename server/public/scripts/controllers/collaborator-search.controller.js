myApp.controller('CollaboratorSearchController', function (UserService, CollaboratorService, ProjectService, $timeout, $mdSidenav, $log) {
    console.log('CollaboratorSearchController created');
    const self = this;

    self.collaborators = CollaboratorService.collaborators;
    self.getAllCollaboratorsForSearch = CollaboratorService.getAllCollaboratorsForSearch;
    self.skillArray = ProjectService.skillArray;
    self.searchParameters = { skills: [' '] };

    self.getAllCollaboratorsForSearch();
    ProjectService.getSkills();
    self.searchCollaborators = CollaboratorService.searchCollaborators;


    // side nav
    self.close = function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('left').close()
            .then(function () {
                $log.debug("close LEFT is done");
            });
    };

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
        var timer;

        return function debounced() {
            var context = self,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function () {
                timer = undefined;
                func.apply(context, args);
            }, wait || 10);
        };
    }

    self.toggleLeft = buildDelayedToggler('left');

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
        return debounce(function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
        }, 200);
    }

    function buildToggler(navID) {
        return function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
        };
    }
});