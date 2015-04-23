(function() {
    'use strict';

    angular
    .module('app')
    .config(config);

    function config($stateProvider, $urlRouterProvider) {
              
        $urlRouterProvider.otherwise("/");
      
        $stateProvider
            .state('state1', {
              url: "/",
              templateUrl: "./app/submit-application/application.html",
              controller: 'submitController',
            controllerAs: 'vm'
            })
            .state('state2', {
              url: "/test",
              templateUrl: "./app/submit-application/test.html",
              controller: 'submitController',
            controllerAs: 'vm'
            })
        }

})();