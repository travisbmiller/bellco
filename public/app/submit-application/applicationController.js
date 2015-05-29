(function() {
    'use strict';

    angular
        .module('app')
        .controller('submitController', submitController)

    submitController.$inject = ['$state', '$rootScope', '$http', '$scope', '$timeout'];

    function submitController($state, $rootScope, $http, $scope, $timeout) { 
        var vm = this;
        vm.application = {};
        vm.selectedLocations = [];
        vm.onlyNumbers = /^\d+$/;
        vm.SelectStores = false;
        vm.showModalError = false;
        vm.showOverlay = false;
        vm.errorMsg = 'You must select at least 1 location';
        vm.application.preferredLocation = [];
        vm.application.positions = {};
        vm.selectedPositions = [];
        
        vm.showLocationModal = function () {
            vm.SelectStores = !vm.SelectStores;
            vm.showOverlay = !vm.showOverlay
        }
        
        vm.changed = function () {
            console.log("I just changed")
        }

        vm.nextStep = function (num, boolan) {
            
            vm["submittedStep" + num] = true;
            
            if (num === 2) {
                
                 if ( !vm.locationCheck( vm.application.locations ) ) {
                    
                    vm.showOverlay = true;
                    vm.showModalError = true;
                    vm.errorMsg = "You must Select At lest one Location."
                    return
                 
                 } else  if ( !vm.jobCheck( vm.application.positions ) ) {
                    
                    vm.showOverlay = true;
                    vm.showModalError = true;
                    vm.errorMsg = "You must Select At lest one Job Position."
                    return

                 } else {
                    num ++; 
                    $state.go("apply.step" + num);
                    return
                 }
                 
            }

            if (boolan || boolan === null) {
                num ++; 
                $state.go("apply.step" + num)
            }
           
        }

        vm.backStep = function (num) {
            num --; 
            $state.go("apply.step" + num)
        }

        

        // Locations
        vm.application.locations = {
           371: 
                {
                    checked: false,
                    city: "Springfield",
                    name: "Mohawk",
                    st: "1505 Mohawk Blvd",
                    id: 371
                },
            1421: 
                {
                    checked: false,
                    city: "Springfield",
                    name: "Main St",
                    st: "4198 Main St",
                    id: 1421
                },
            16630: 
                {
                    checked: false,
                    city: "Albany",
                    name: "West Albany",
                    st: "1835 Pacific Blvd SW",
                    id: 16630
                },
            17559: 
                {
                    checked: false,
                    city: "Albany",
                    name: "K-Mart",
                    st: "200 Airport Rd SE",
                    id: 17559
                },
            19827: 
                {
                    checked: false,
                    city: "Lebanon",
                    name: "Lebanon",
                    st: "12 E Airport Rd",
                    id: 19827
                },
            17701: 
                {
                    checked: false,
                    city: "Redmond",
                    name: "Redmond",
                    st: "1214 S Hwy 97",
                    id: 17701
                },
            20155: 
                {
                    checked: false,
                    city: "Lapine",
                    name: "Lapine",
                    st: "16490 1st St",
                    id: 20155
                },
            26037: 
                {
                    checked: false,
                    city: "Madras",
                    name: "Madras",
                    st: "44 SW 5th St",
                    id: 26037
                }
        }

        vm.locationCheck = function (locations) {
            for (var prop in locations) {
                if (locations[prop].checked) {
                    return true;
                }
            }
            return false;
        }

        vm.jobCheck = function (obj) {
            for (var prop in obj) {
                if (obj[prop]) {
                    return true;
                }
            }
            return false;
        }

        vm.addLocation = function (location, id) {
            for (var i = 0; i < vm.selectedLocations.length; i++) {
                if (vm.selectedLocations[i] === location) {
                    return vm.selectedLocations.splice(i, 1);

                }
            }
            vm.application.preferredLocation.push(id)
            vm.selectedLocations.push(location) 
        };

        vm.addPosition = function (position) {
            if ( vm.selectedPositions.indexOf( position ) === -1) {
                vm.selectedPositions.push( position )
            } else {
                vm.selectedPositions.splice(vm.selectedPositions.indexOf(position), 1) 
            }            
        };

        vm.submit = function (data) {
            // $state.go('state2')
           
            console.log(data)
            return $http.post("api/application", data)
                .then(function (res) {
                    console.log(res)
                }, function (err) {
                    console.log(err)
                })

        }
    }   


})();   

