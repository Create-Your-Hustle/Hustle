myApp.controller('CollaboratorRatingController', function(UserService, ProjectService, dataToPass, $mdDialog, $routeParams){
    console.log('CollaboratorRatingController created');
    const self = this;

    self.ProjectService = ProjectService;

    self.dataToPass = dataToPass
    self.projectProfile = ProjectService.projectProfile


    self.submitRatings = ProjectService.submitRatings

    self.ratings = [
        {
            title: 'Communication',
            current: 1,
            max: 5,
            rating_type: 1
        },{
            title: 'Follow-Through',
            current: 1,
            max: 5,
            rating_type: 2
        },{
            title: 'Friendliness',
            current: 1,
            max: 5,
            rating_type: 3
        },{
            title: 'Accuracy',
            current: 1,
            max: 5,
            rating_type: 4
        },{
            title: 'Overall Experience',
            current: 1,
            max: 5,
            rating_type: 5
        },
    ];

    self.getSelectedRating = function (rating) {
        console.log(rating);
    }

});
