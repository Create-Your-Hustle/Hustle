myApp.controller('ProjectSearchController', function(UserService, ProjectService, skillFilter, $timeout, $log, $mdSidenav){
    const self = this;

    //TODO - change this to ProjectService.projectSearchArray after search functionality is complete
    self.projectSearchArray = ProjectService.projectArray;
    self.skillArray = ProjectService.skillArray;
    self.getProjectSearchResult = ProjectService.getProjectSearchResult;
    self.searchParameters = { skills: [' '] };

    ProjectService.getSkills();
    ProjectService.getProjects();

    //filter logic - TODO are we using this??
    self.filteredProjects = [];
    self.parametersChanged = function (skills) {
        self.filteredProjects = skillFilter(self.projectSearchArray.list, skills)
    };

    //checkboxes - set checked to true, unchecked to null (so the )

    //SIDENAV LOGIC BELOW
    self.close = function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('left').close()
            .then(function () {
                $log.debug("close LEFT is done");
            });
    };

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