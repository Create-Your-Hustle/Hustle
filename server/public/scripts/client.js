var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'jkAngularCarousel', 'ngMessages']);

/// Routes ///
myApp.config(function($routeProvider, $locationProvider, $mdThemingProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config')
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
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/info', {
      templateUrl: '/views/templates/info.html',
      controller: 'InfoController as vm',
      resolve: {
        getuser : function(UserService){
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
      templateUrl: '/views/templates/contact.html',
      controller: 'InfoController as vm'
    })
    
    .when('/collaborator-search', {
      templateUrl: '/views/templates/collaborator-search.html',
      controller: 'CollaboratorSearchController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/projects', {
      templateUrl: '/views/templates/projects.html',
      controller: 'ProjectSearchController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/myproject/:id', {
      templateUrl: '/views/templates/project-profile.html',
      controller: 'ProjectProfileController as vm',
      resolve: {
        getuser : function(UserService){
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
      '50': 'ff634f',
      '100': 'ff634f',
      '200': 'ff634f',
      '300': 'ff634f',
      '400': 'ff634f',
      '500': 'ff634f',
      '600': 'ff634f',
      '700': 'ff634f',
      '800': 'ff634f',
      '900': 'ff634f',
      'A100': 'ff634f',
      'A200': 'ff634f',
      'A400': 'ff634f',
      'A700': 'ff634f',
      'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                          // on this palette should be dark or light
  
      // 'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
      //  '200', '300', '400', 'A100'],
      // 'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });
  
    $mdThemingProvider.theme('default')
      .primaryPalette('primaryColorRorange')
  
});