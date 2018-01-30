myApp.service('CollaboratorService', function ($http, $location) {
    console.log('CollaboratorService Loaded');
    const self = this;

    const examplePeople = [
      {username: 'Top-hat Jones', user_picture: '../views/images/profile-default.jpg', skill_name: 'Hiding'},
      {username: 'Mr. Poopybutthole', user_picture: '../views/images/profile-default.jpg', skill_name: 'Talking'},
      {username: 'Mr. Meseeks', user_picture: '../views/images/profile-default.jpg', skill_name: 'Helping'}
    ];

    self.collaborators = { list: [] };

    // Get all collaborator data for collaborator search view
    self.getAllCollaboratorsForSearch = function () {

      // the query in the route needs to be changed to include the concatonated skills

      $http({
        method:'GET',
        url:'/collaborator/search/all'
      }).then(function (response) {
        console.log('getAllCollaboratorsForSearch response', response);
        self.collaborators.list = response.data;
      });
    };
  });
  