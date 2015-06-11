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
        

        if (docData.data.jobs && docData.data.jobs.one && docData.data.jobs.one.jobdetails) {
            vm.jobDetails1 = breakStrings( docData.data.jobs.one.jobdetails );
        }

        if (docData.data.jobs && docData.data.jobs.two && docData.data.jobs.two.jobdetails) {
            vm.jobDetails2 = breakStrings( docData.data.jobs.two.jobdetails );
        }

        if (docData.data.jobs && docData.data.jobs.one && docData.data.jobs.one.leaveReason) {
            vm.leaveReason1 = breakStrings( docData.data.jobs.one.leaveReason );
        }

        if (docData.data.jobs && docData.data.jobs.two && docData.data.jobs.two.leaveReason) {
            vm.leaveReason2 = breakStrings( docData.data.jobs.two.leaveReason );
        }
        
        


        

        function breakStrings (str) {
            
            if (str.length > 80) {
                var obj = {}
                // find space and break line
                var n = 80
                
                while (n > 0) {
                    
                    if ( str.charAt(n) === " " ) {
                        console.log("80 was a space")
                        var breakAt = n
                        break;
                    } else {
                        console.log(n)
                        n--;
                    }
                }
                
                obj.line1 = str.slice(0,breakAt)
                obj.line2 = str.slice(breakAt)
            

                return obj;
            }
        }


    }   


})();   

