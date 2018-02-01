myApp.controller('ProjectSearchController', function(UserService, ProjectService, skillFilter){
    console.log('ProjectSearchController created');
    const self = this;

    //TODO - change this to ProjectService.projectSearchArray after search functionality is complete
    self.projectSearchArray = ProjectService.projectArray;
    self.skillArray = ProjectService.skillArray;

    ProjectService.getSkills();
    ProjectService.getProjects();

    //filter logic
    self.filteredProjects = [];
    self.parametersChanged = function (skills) {
        console.log(skills);
        self.filteredProjects = skillFilter(self.projectSearchArray.list, skills)
        console.log('EVENTS', self.filteredProjects);
    }

    function debounce(func, wait, context) {
        var timer;

        return function debounced() {
            var context = $scope,
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