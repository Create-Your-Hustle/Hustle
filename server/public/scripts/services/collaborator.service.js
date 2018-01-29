myApp.service('CollaboratorService', function ($http, $location) {
    console.log('CollaboratorService Loaded');
    const self = this;

    const examplePeople = [
      {username: 'Top-hat Jones', user_picture: '../views/images/profile-default.jpg', skill_name: 'Hiding'},
      {username: 'Mr. Poopybutthole', user_picture: '../views/images/profile-default.jpg', skill_name: 'Talking'},
      {username: 'Mr. Meseeks', user_picture: '../views/images/profile-default.jpg', skill_name: 'Helping'}
    ];

    self.collaborators = { list: examplePeople };

    
  });
  