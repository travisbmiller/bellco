(function() {
    'use strict';

    angular
    .module('app')
    .config(config);

    function config($stateProvider, $urlRouterProvider) {
              
        $urlRouterProvider.otherwise("/");
      
        $stateProvider
            .state('apply', {
              url: "/apply",
              templateUrl: "./app/submit-application/appl.html",
              controllerAs: 'vm',
              controller: 'submitController'
            
            })
            .state('state2', {
              url: "/test",
              templateUrl: "./app/submit-application/test.html",
              controllerAs: 'vm',
              controller: 'submitController'
            
            })
        }

})();