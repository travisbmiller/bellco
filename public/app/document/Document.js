(function() {
    'use strict';

    angular
        .module('app')
        .controller('ViewDocument', ViewDocument)

    ViewDocument.$inject = ['$http','docData', '$state', '$timeout', '$window'];

    function ViewDocument($http, docData, $state, $timeout, $window) { 
        var vm = this;
        vm.doc = {}
        vm.doc = docData.data
        vm.animate = true;
        
        

    }   


})();   

