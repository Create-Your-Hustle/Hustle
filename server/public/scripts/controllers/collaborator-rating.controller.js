myApp.controller('CollaboratorRatingController', function(UserService, ProjectService, dataToPass, $mdDialog, $routeParams){
    const self = this;

    self.ProjectService = ProjectService;

    self.dataToPass = dataToPass;
    self.projectProfile = ProjectService.projectProfile;
    self.cancel = ProjectService.cancel;


    self.submitRatings = ProjectService.submitRatings;

    self.ratings = [
        {
            title: 'Communication',
            current: 1,
            max: 5,
            rating_type: 'communication'
        },{
            title: 'Follow-Through',
            current: 1,
            max: 5,
            rating_type: 'followthrough'
        },{
            title: 'Friendliness',
            current: 1,
            max: 5,
            rating_type: 'friendliness'
        },{
            title: 'Accuracy',
            current: 1,
            max: 5,
            rating_type: 'accuracy'
        },{
            title: 'Overall Experience',
            current: 1,
            max: 5,
            rating_type: 'overall'
        },
    ];

    // self.ratings = {
    //     communication: 1,
    //     followthrough: 1,
    //     friendliness: 1,
    //     accuracy: 1,
    //     overall: 1
    // };
});
