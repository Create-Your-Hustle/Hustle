myApp.service('AutoCompleteService', function ($http, $location, $routeParams, $mdDialog, $log, $q, $timeout) {
    const self = this;

    
      /**
       * Create filter function for a query string
       */
    self.createFilterFor = function(query) {
        var lowercaseQuery = angular.lowercase(query);
  
        return function filterFn(state) {
          return (state.value.indexOf(lowercaseQuery) === 0);
        };
      }  

    self.querySearch = function(query) {
        var results = query ? self.states.filter( self.createFilterFor(query) ) : self.states,
            deferred;
        if (self.simulateQuery) {
          deferred = $q.defer();
          $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
          return deferred.promise;
        } else {
          return results;
        }
      }
  
      self.searchTextChange = function(text) {
        $log.info('Text changed to ' + text);
      }
  
       self.selectedItemChange = function(item) {
        $log.info('Item changed to ' + JSON.stringify(item));
      }
  
      /**
       * Build `states` list of key/value pairs
       */
      self.loadAll = function() {
        var allStates = `AL, AK, AZ, AR, CA, CO, CT, DE, DC, FL, GA, HI, ID, IL, IN, IA, KS, KY, LA, ME, MD, MA, MI, MN, MS, MO, MT, NE, NV, NH, NJ, NM, NY, NC, ND, OH, OK, OR, PA, RI, SC, SD, TN, TX, UT, VT, VA, WA, WV, WI, WY`;
  
        return allStates.split(/, +/g).map( function (state) {
          return {
            value: state.toLowerCase(),
            display: state
          };
        });
      }
      self.states = self.loadAll();

});
