myApp.service('CollaboratorService', function ($http, $location) {
    const self = this;

    self.collaborators = { list: [] };

    // Get all collaborator data for collaborator search view
    self.getAllCollaboratorsForSearch = function () {
      $http({
        method:'GET',
        url:'/collaborator/search/all'
      }).then(function (response) {
        self.collaborators.list = response.data;
      });
    };

    self.searchCollaborators = function (searchParameterObject) {
      $http({
        method:'GET',
        url:'/collaborator/search',
        params: searchParameterObject,
      }).then(function (response) {
        self.collaborators.list = response.data;
      });
    };
  });
  