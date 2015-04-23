(function() {
    'use strict';

    angular
        .module('app')
        .controller('submitController', submitController)

    submitController.$inject = ['$state', '$rootScope', '$http'];

    function submitController($state, $rootScope, $http, $scope) { 
        var vm = this;
        
        vm.t = {
            personalInformation: {
                firstName: "traviss"
            }
        }
        
        console.log(vm.t.personalInformation.firstName)

        vm.onlyNumbers = /^\d+$/;
        vm.test="testing123 its works!"
        vm.sumbitApplication = function (data) {
            $state.go('state2')
            console.log(data)
            $rootScope.t = data;
            console.log(vm.t)
        }
        

        $rootScope.t = { 
            personalInformation: {
                middleName: "testing"
            }
        }

        console.log($rootScope.t.personalInformation.middleName)
        

        // vm.getfile = function () {
        //     return $http.get('/api/test')
        //         .then(function (res) {
        //             //console.log(res.data)
        //             vm.testfile = res.data

        //         }, function (err) {
        //             console.log(err)
        //         })
        // }

        // vm.getfile()

    }


})();   