(function() {
    'use strict';

    angular
        .module('app')
        .factory('authService', authService);

    authService.$inject = ['$http','$state'];

    function authService($http, $state) {
        
        return {
            login: login
        };

        function login(obj) {
            
            return $http.post('/api/login', obj)
            .then(loginComplete)
            .catch(loginFailed);

            function loginComplete(response) {
                $state.go('dashboard')
            }

            function loginFailed(error) {
                return error.data;
            }
        }

    }
})();   