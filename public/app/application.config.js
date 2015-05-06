(function() {
    'use strict';

    angular
    .module('app')
    .config(config);

    function config($stateProvider, $urlRouterProvider) {
              
        $urlRouterProvider.otherwise("/");
      
        $stateProvider
            .state('apply', {
              abstract: true,
              templateUrl: "./app/submit-application/temp.html",
              controllerAs: 'vm',
              controller: 'submitController'
            })
            .state('apply.step1', {
              url: "/apply",
              templateUrl: "./app/submit-application/step1.html",
            })
            .state('apply.step2', {
              url: "/apply1",
              templateUrl: "./app/submit-application/step2.html",
            })
            .state('apply.step3', {
              url: "/apply2",
              templateUrl: "./app/submit-application/step3.html",
            })
            .state('apply.step4', {
              url: "/apply3",
              templateUrl: "./app/submit-application/step4.html",
            })
            .state('apply.step5', {
              url: "/apply4",
              templateUrl: "./app/submit-application/step5.html",
            })


            .state('state2', {
              url: "/test",
              templateUrl: "./app/submit-application/test.html",
              controllerAs: 'vm',
              controller: 'submitController'
            })
            .state('state3', {
              url: "/dash",
              templateUrl: "./app/dashboard/dash.html",
              controllerAs: 'vm',
              controller: 'Dashboard'
            
            })
            .state('state4', {
              url: "/select",
              templateUrl: "./app/submit-application/date.html",
              controllerAs: 'vm',
              controller: 'submitController'
            
            })

        }

})();