myApp.service('CollaboratorService', function ($http, $location) {
    console.log('CollaboratorService Loaded');
    const self = this;

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
  