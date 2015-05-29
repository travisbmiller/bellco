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
              url: '/test',
              templateUrl: "./app/submit-application/step2.html",
            })
            .state('apply.step3', {
              templateUrl: "./app/submit-application/step3.html",
            })
            .state('apply.step4', {
              templateUrl: "./app/submit-application/step4.html",
            })
            .state('apply.step5', {
              templateUrl: "./app/submit-application/step5.html",
            })


            .state('viewDoc', {
              url: "/doc/:id",
              templateUrl: "./app/submit-application/test.html",
              controllerAs: 'vm',
              controller: 'ViewDocument',
              resolve: {
                docData: function ($stateParams, $http) {
                  return $http.get('/api/application/' + $stateParams.id)
                }
              }
            })
            
            .state('dashboard', {
              url: "/dash",
              templateUrl: "./app/dashboard/dash.html",
              controllerAs: 'vm',
              controller: 'Dashboard'
            
            })
            
            .state('login', {
              url: "/login",
              templateUrl: "./app/login/login.html",
              controllerAs: 'vm',
              controller: 'Login'
            })

        }

})();