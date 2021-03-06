myApp.controller('ProjectProfileController', function(UserService, ProjectService, AutoCompleteService, $mdDialog, $routeParams, $log, $q, $timeout){
    console.log('ProjectProfileController created');
    const self = this;

    self.ProjectService = ProjectService;
    self.UserService = UserService
    self.AutoCompleteService = AutoCompleteService

    self.isEditing = {};


    ProjectService.getProjects();
    ProjectService.getSkills();
    ProjectService.getProjectProfile($routeParams.id);
    ProjectService.getProjectSkills($routeParams.id);
    ProjectService.getProjectCollaborators($routeParams.id);
    ProjectService.getCollaborationRequests($routeParams.id);

    
    self.userObject = UserService.userObject;
    self.projectSkillArray = ProjectService.projectSkillArray;
    self.projectArray = ProjectService.projectArray;
    self.projectProfile = ProjectService.projectProfile;
    self.projectCollaboratorArray = ProjectService.projectCollaboratorArray;
    self.rateCollaborator = ProjectService.rateCollaborator;
    self.projectCollaborationRequestArray = ProjectService.projectCollaborationRequestArray;
    self.acceptCollaboration = ProjectService.acceptCollaboration;
    self.declineCollaboration = ProjectService.declineCollaboration;
    self.contactProjectOwner = ProjectService.contactProjectOwner;
    self.uploadProjectPicture = ProjectService.uploadProjectPicture;
    self.sendMessage = ProjectService.sendMessage;
    self.skillArray = ProjectService.skillArray;
    self.addProjectSkill = ProjectService.addProjectSkill;
    self.editProjectHead = ProjectService.editProjectHead;
    self.editProjectPreferences = ProjectService.editProjectPreferences;
    self.cancel = ProjectService.cancel;
    self.querySearch = AutoCompleteService.querySearch;
    self.searchTextChange = AutoCompleteService.searchTextChange;
    self.selectedItemChange = AutoCompleteService.selectedItemChange
    self.loadAll = AutoCompleteService.loadAll;

    self.editProjectName = function (value) {
        self.isEditing.project = false;
        self.editProjectHead(value);
      };
    
      self.editPreferences = function (pref) {
        self.isEditing.preferences = false
        self.editProjectPreferences(pref)
      };

      self.simulateQuery = false;
      self.isDisabled    = false;
      self.querySearch   = AutoCompleteService.querySearch;
      self.selectedItemChange = AutoCompleteService.selectedItemChange;
      self.searchTextChange   = AutoCompleteService.searchTextChange;      
      self.states = AutoCompleteService.states;
      


});
