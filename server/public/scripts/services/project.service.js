myApp.service('ProjectService', function ($http, $location) {
    console.log('ProjectService Loaded');
    const self = this;

    self.projectArray = { list: [] };
    self.skillArray = { list: [] };

    //Get all projects
    self.getProjects = function () {
      $http({
        method:'GET',
        url:'/project'
      }).then(function (response) {
        console.log('response', response);
        self.projectArray.list = response.data;
      })
    };


    self.getProjectSearchResult = function (searchParamsObject) {
      $http({
        method:'GET',
        url:'/project/search',
        data: searchParamsObject,
      }).then(function (response) {
        console.log('response', response);
        self.projectArray.list = response.data;
      })
    };

    //get skill list for select
    self.getSkills = function() {
      $http({
        method: 'GET',
        url: '/project/skills',
      }).then(function(response){
        console.log(response.data);
        self.skillArray.list = response.data;
      })
    }

  });
  