app.service('ProjectService', function ($http, $location) {
    console.log('ProjectService Loaded');
    const self = this;

    self.projectArray = { list: [] };

    //Get all projects
    self.getProjects = function () {
      $http:({
        method:'GET',
        url:'/project'
      }).then(function (response) {
        console.log('response', response);
        self.projectArray.list = response.data;
      })
    }



  });
  