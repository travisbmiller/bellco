(function() {
    'use strict';

    angular
        .module('app')
        .controller('submitController', submitController)

    submitController.$inject = ['$state', '$rootScope', '$http', '$scope', '$timeout'];

    function submitController($state, $rootScope, $http, $scope, $timeout) { 
        var vm = this;
        
        vm.selectedLocations = [];
        console.log(vm.selectedLocations.length)
        vm.onlyNumbers = /^\d+$/;
        vm.SelectStores = false;
        vm.showOverlay = false;

        vm.showLocationModal = function () {
            console.log("hit")
            vm.SelectStores = !vm.SelectStores;
            vm.showOverlay = !vm.showOverlay

        }
        
        console.log("loaded controller")

        // vm.step1 = true;
        // vm.step2 = false;
        // vm.step3 = false;
        // vm.step4 = false;
        // vm.step5 = false;

        

        vm.nextStep = function (num, boolan) {
            
            vm["submittedStep" + num] = true;
            
            
            if (boolan || boolan === null) {
                num ++; 
                $state.go("apply.step" + num)
            }
           
        }

        vm.backStep = function (num) {
            
            num --; 
            $state.go("apply.step" + num)
        }

        vm.locations = [
                    {
                        checked: false,
                        id: 371, 
                        city: "Springfield",
                        name: "Mohawk",
                        st: "1505 Mohawk Blvd"
                    },
                    {
                        checked: false,
                        id: 1421,
                        city: "Springfield",
                        name: "Main St",
                        st: "4198 Main St"
                    },
                    {
                        checked: false,
                        id: 16630,
                        city: "Albany",
                        name: "West Albany",
                        st: "1835 Pacific Blvd SW"
                    },
                    {
                        checked: false,
                        id: 17559,
                        city: "Albany",
                        name: "K-Mart",
                        st: "200 Airport Rd SE"
                    },
                    {
                        checked: false,
                        id: 19827,
                        city: "Lebanon",
                        name: "Lebanon",
                        st: "12 E Airport Rd"
                    },
                    {
                        checked: false,
                        id: 17701,
                        city: "Redmond",
                        name: "Redmond",
                        st: "1214 S Hwy 97"
                    },
                    {
                        checked: false,
                        id: 20155,
                        city: "Lapine",
                        name: "Lapine",
                        st: "16490 1st St"
                    },
                    {
                        checked: false,
                        id: 26037,
                        city: "Madras",
                        name: "Madras",
                        st: "44 SW 5th St"
                    }
                ]


        vm.addLocation = function (location) {
            
            for (var i = 0; i < vm.selectedLocations.length; i++) {
                if (vm.selectedLocations[i] === location) {
                    return vm.selectedLocations.splice(i, 1);
                }
            }
            vm.selectedLocations.push(location)         
            
        };


            

        // }

    

        vm.sumbitApplication = function (data) {
            // $state.go('state2')
            // console.log(data)
            // $rootScope.t = data;
            console.log(data, vm.locations)

        }
        

        

       

    }


})();   

