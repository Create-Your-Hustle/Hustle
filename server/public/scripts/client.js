var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'jkAngularCarousel', 'ngMessages']);

/// Routes ///
myApp.config(function ($routeProvider, $locationProvider, $mdThemingProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'HomeController as hc',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as lc'
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/user/:id', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/info', {
      templateUrl: '/views/templates/info.html',
      controller: 'InfoController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })

    .when('/faq', {
      templateUrl: '/views/templates/faq.html',
      controller: 'InfoController as vm'
    })

    .when('/about', {
      templateUrl: '/views/templates/about.html',
      controller: 'InfoController as vm'
    })

    .when('/contact', {
      templateUrl: '/views/templates/about.html',
      controller: 'InfoController as vm'
    })

    .when('/collaborator-search', {
      templateUrl: '/views/templates/collaborator-search.html',
      controller: 'CollaboratorSearchController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/projects', {
      templateUrl: '/views/templates/projects.html',
      controller: 'ProjectSearchController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/projectprofile/:id', {
      templateUrl: '/views/templates/project-profile.html',
      controller: 'ProjectProfileController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/myprojects/:id', {
      templateUrl: '/views/templates/my-projects.html',
      controller: 'MyProjectsController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/reset/password/:code?', {
      templateUrl: '/views/templates/password-reset.html',
      controller: 'ResetController as vm',
    })
    .otherwise({
      redirectTo: 'home'
    });

  $mdThemingProvider.definePalette('primaryColorRorange', {
    '50': 'FFECEA',
    '100': 'FFD0CA',
    '200': 'FFB1A7',
    '300': 'FF9284',
    '400': 'FF7A69',
    '500': 'FF634F',
    '600': 'FF5B48',
    '700': 'FF513F',
    '800': 'FF4736',
    '900': 'FF3526',
    'A100': 'FFFFFF',
    'A200': 'FFFFFF',
    'A400': 'FFD6D4',
    'A700': 'FFBEBA',
  //   'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
  // on this palette should be dark or light

  // 'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
  //  '200', '300', '400', 'A100'],
  // 'contrastLightColors': undefined    // could also specify this if default was 'dark'
  });

  $mdThemingProvider.theme('default')
    .primaryPalette('primaryColorRorange', {
    })
    .accentPalette('blue-grey')
});

    //Star Directive
    myApp.directive('starRating', function () {
      return {
        restrict: 'A',
        template: '<ul class="rating">' +
          '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
          '\u2605' +
          '</li>' +
          '</ul>',
        scope: {
          ratingValue: '=',
          max: '=',
          onRatingSelected: '&'
        },
        link: function (scope, elem, attrs) {
  
          var updateStars = function () {
            scope.stars = [];
            for (var i = 0; i < scope.max; i++) {
              scope.stars.push({
                filled: i < scope.ratingValue
              });
            }
          };
  
          scope.toggle = function (index) {
            scope.ratingValue = index + 1;
            scope.onRatingSelected({
              rating: index + 1
            });
          };
  
          scope.$watch('ratingValue', function (oldVal, newVal) {
            if (newVal) {
              updateStars();
            }
          });
        }
      }
    })
