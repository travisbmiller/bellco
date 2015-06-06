(function() {
    'use strict';

    angular
    .module('app')
    .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    
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
              url: "/",
              templateUrl: "./app/submit-application/step1.html",
            })
            .state('apply.step2', {
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
            .state('submit-success', {
              controllerAs: 'vm',
              controller: 'submitSuccessController',
              templateUrl: "./app/submit-application/success.html",
            })


            .state('viewDoc', {
              url: "/doc/:id",
              templateUrl: "./app/submit-application/test.html",
              controllerAs: 'vm',
              controller: 'ViewDocument',
              resolve: {
                docData: function ($stateParams, $http, $state) {
                  return $http.get('/api/application/' + $stateParams.id)
                  .catch(function (err) {
                    if ( err.data === "Not Authenticated" ) {
                      $state.go('login')
                    }
                  })
                }
              }
            })
            
            .state('dashboard', {
              url: "/dash",
              templateUrl: "./app/dashboard/dash.html",
              controllerAs: 'vm',
              controller: 'Dashboard',
              resolve: {
                user: function ($state, $stateParams, $http ) {
                  return $http.get('/api/user/' + $stateParams.id)
                    .then(function (data) {
                        
                    }, function (err) {
                        //console.log('err ', err)
                        $state.go('login')
                    })
                }
              }
            
            })
            
            .state('login', {
              url: "/login",
              templateUrl: "./app/login/login.html",
              controllerAs: 'vm',
              controller: 'Login'
            })

        }


})();