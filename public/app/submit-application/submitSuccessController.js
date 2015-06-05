(function() {
    'use strict';

    angular
        .module('app')
        .controller('submitSuccessController', submitSuccessController)

    submitSuccessController.$inject = ['$state', '$timeout', '$window'];

    function submitSuccessController($state, $timeout, $window) { 
        var vm = this;
        
        vm.pageTitle = "success";

        //hides
        vm.success1 = true;
        vm.success2 = true;
        vm.success3 = true;
        vm.animate = true;
        if ($window.outerWidth > 640) {
    
            $timeout(function () {
               vm.success1 = false; 
            }, 1400);

            $timeout(function () {
               vm.success2 = false; 
            }, 1700);

            $timeout(function () {
               vm.success3 = false; 
            }, 2000)

        } else {
            $timeout(function () {
               vm.success1 = false; 
            }, 1000);

            $timeout(function () {
               vm.success2 = false; 
            }, 1500);

            $timeout(function () {
               vm.success3 = false; 
            }, 1900)
        }


    }   


})();   

