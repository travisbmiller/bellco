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
        
        vm.states = [
            { st: "AK", name: "AK"},
            { st: "AZ", name: "AZ"},
            { st: "AR", name: "AR"},
            { st: "CA", name: "CA"},
            { st: "CO", name: "CO"},
            { st: "CT", name: "CT"},
            { st: "DE", name: "DE"},
            { st: "DC", name: "DC"},
            { st: "FL", name: "FL"},
            { st: "GA", name: "GA"},
            { st: "HI", name: "HI"},
            { st: "ID", name: "ID"},
            { st: "IL", name: "IL"},
            { st: "IN", name: "IN"},
            { st: "IA", name: "IA"},
            { st: "KS", name: "KS"},
            { st: "KY", name: "KY"},
            { st: "LA", name: "LA"},
            { st: "ME", name: "ME"},
            { st: "MD", name: "MD"},
            { st: "MA", name: "MA"},
            { st: "MI", name: "MI"},
            { st: "MN", name: "MN"},
            { st: "MS", name: "MS"},
            { st: "MO", name: "MO"},
            { st: "MT", name: "MT"},
            { st: "NE", name: "NE"},
            { st: "NV", name: "NV"},
            { st: "NH", name: "NH"},
            { st: "NJ", name: "NJ"},
            { st: "NM", name: "NM"},
            { st: "NY", name: "NY"},
            { st: "NC", name: "NC"},
            { st: "ND", name: "ND"},
            { st: "OH", name: "OH"},
            { st: "OK", name: "OK"},
            { st: "OR", name: "OR"},
            { st: "PA", name: "PA"},
            { st: "RI", name: "RI"},
            { st: "SC", name: "SC"},
            { st: "SD", name: "SD"},
            { st: "TN", name: "TN"},
            { st: "TX", name: "TX"},
            { st: "UT", name: "UT"},
            { st: "VT", name: "VT"},
            { st: "VA", name: "VA"},
            { st: "WA", name: "WA"},
            { st: "WV", name: "WV"},
            { st: "WI", name: "WI"},
            { st: "WY", name: "WY"}
        ]

        vm.showLocationModal = function () {
            vm.SelectStores = !vm.SelectStores;
            vm.showOverlay = !vm.showOverlay
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
        vm.application.locations = [ 
                {
                    checked: false,
                    city: "Springfield",
                    name: "Mohawk",
                    st: "1505 Mohawk Blvd",
                    id: 371
                }, 
                {
                    checked: false,
                    city: "Springfield",
                    name: "Main St",
                    st: "4198 Main St",
                    id: 1421
                },
                {
                    checked: false,
                    city: "Albany",
                    name: "West Albany",
                    st: "1835 Pacific Blvd SW",
                    id: 16630
                }, 
                {
                    checked: false,
                    city: "Albany",
                    name: "K-Mart",
                    st: "200 Airport Rd SE",
                    id: 17559
                }, 
                {
                    checked: false,
                    city: "Lebanon",
                    name: "Lebanon",
                    st: "12 E Airport Rd",
                    id: 19827
                },
                {
                    checked: false,
                    city: "Redmond",
                    name: "Redmond",
                    st: "1214 S Hwy 97",
                    id: 17701
                }, 
                {
                    checked: false,
                    city: "Lapine",
                    name: "Lapine",
                    st: "16490 1st St",
                    id: 20155
                },
                {
                    checked: false,
                    city: "Madras",
                    name: "Madras",
                    st: "44 SW 5th St",
                    id: 26037
                },
                {
                    checked: false,
                    city: "Prineville",
                    name: "Prineville",
                    st: "2042  NE 3rd Street",
                    id: 311237
                }
        ];

        

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
            //console.log(location)
            //console.log(id)

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
            for(var prop in data.positions) {
                if (!data.positions[prop]) delete data.positions[prop];
            };
           
            // console.log(data)
            return $http.post("api/application", data)
                .then(function (res) {
                    // console.log("success")
                    $state.go('submit-success')
                }, function (err) {
                    // console.log("err")
                    // console.log(err)

                    vm.showModalError = true;
                    vm.showOverlay = true;
                   
                    vm.errorMsg = "There was an error trying to submit your application. If this error continues please check your Internet connect and try again at a later time."

                })

        }


    }   


})();   

