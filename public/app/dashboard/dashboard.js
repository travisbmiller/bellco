(function() {
    'use strict';

    angular
        .module('app')
        .controller('Dashboard', Dashboard)

    Dashboard.$inject = ['$http', '$state', '$window', '$scope', '$timeout'];

    function Dashboard ($http, $state, $window, $scope, $timeout) {
        var vm = this;
        
        vm.data = [];
        
        // Date Filter Info
        vm.dateFilter = "Last 30 Days";
        vm.dateDisplay = '';
        vm.dateRange = {};
        vm.dateRange.from = 'From';
        vm.dateRange.to = 'To'
        vm.setHeight = false;
        
        // Stores
        vm.selectedStores = 0;

        // Position Filter Info
        vm.selectedPositions = 0;
        vm.positionFilter = "All"

        // Hide & Shows
        vm.showOverlay = false;
        vm.showFilterStores = false;
        vm.showFilterDate = false;
        vm.showFilterPosition = false;
        
    
    
        vm.logThis = function (str) {
            console.log(str)
        }

        // Checking to see if all are selected
        vm.selectAll = function (obj) {
            console.log("call selectAll")
            
            // If True deselect all properties of Obj
            for ( var prop in obj ) {
                //console.log(prop)
                if (prop !== 'all') {
                    if (!obj[prop]) {
                        obj['all'] = false;
                        return;
                    }
                }
            }
            return obj['all'] = true;
        }
     
        
        
        // Filter Drop down  
        vm.showFilter = function (filter) {
            vm.setHeight = false;
            // Setting height base on width of screen
            if ($window.innerWidth < 640 ) {
                var height = $window.innerHeight - 100;
                vm.setHeight = true;
                vm.wHeight = height;
            }

            if ( vm.showOverlay ) {
                vm.showOverlay = !vm.showOverlay;
                vm[filter] = !vm[filter];
                console.log(vm[filter])
                return;
            }
            else {
                vm.showOverlay = !vm.showOverlay;
                vm[filter] = !vm[filter];
                console.log(vm[filter])
                return;
            };
        }

        // Click on Overlay
        vm.closeOverlay = function () {
            vm.setHeight = false;
            if ( !vm.showFilterStores || !vm.showFilterDate || !vm.showFilterPosition ) {
                return 
            }

            vm.showOverlay = !vm.showOverlay;

            if (vm.showFilterStores) return  vm.showFilterStores = false;
            if (vm.showFilterDate) return vm.showFilterDate = false;
            if (vm.showFilterPosition) return vm.showFilterPosition = false;
        }

        vm.goToApp = function (id) {
            console.log(id);
        }

        // Stores
            
            vm.stores = [371, 1421, 16630, 19827, 17559, 20155, 26037, 17701];
            
            vm.location = {
                371:   true, 
                1421:  true, 
                16630: true, 
                19827: true, 
                17559: true, 
                20155: true, 
                26037: true, 
                17701: true
            }

            // Click on Store 
            vm.selectStore = function (num) {
                $timeout(function () {
                    
                    // Check to see if all locations are true
                    vm.selectAll(vm.location);
                    
                    if ( vm.stores.indexOf(num) !== -1 ) {
                    vm.stores.splice(vm.stores.indexOf(num), 1);
                    } else {
                        vm.stores.push(num)
                    }
                    

                    countStores();
                    
                    // Calling API
                    load(vm.stores, positions, date1, date2)
                    .then(function (res) {
                        vm.data = res.data;
                    }, function (err) {
                        console.log(err)
                    })

                },0);                 
            }

            // Select All Stores in Filter
            vm.clickAllStores = function (name) {
                $timeout(function () {
                    if (vm[name].all) {
                    // select All
                    console.log("true")
                    
                    
                    for (var prop in vm[name]) {
                        
                        vm[name][prop] = true;
                        
                        if (prop !== 'all' ) {
                            
                            if ( vm.stores.indexOf(prop) !== -1 ) {
                                vm.stores.splice(vm.stores.indexOf(prop), 1);
                            } else {
                                vm.stores.push(parseInt(prop))
                            } 
                                    
                        }

                        
                    }
                } else {
                    // Deselect All
                    console.log("false")
                    for (var prop in vm[name]) {
                        vm[name][prop] = false;
                    }
                    vm.stores = [];
                }
                
                countStores();
                load(vm.stores, positions, date1, date2)
                    .then(function (res) {
                        vm.data = res.data;
                    }, function (err) {
                        console.log(err)
                    })

                },0)
            }

            var countStores = function () {
                vm.selectedStores = 0;
                
                for ( var prop in vm.location ) {
                    
                    console.log(vm.location[prop])
                    
                    if ( prop !== "all" ) {
                        if ( vm.location[prop] ) vm.selectedStores ++;
                    }
                }
                console.log(vm.selectedStores)
            }

            countStores();
        


        // Dates
        var date1 = "2015-01-11";
        var date2 = "2015-06-11";
        
     
        // Positions 
            
            // View Names
            vm.positions = {
                
                "General Store Manager" : true,
                "Sr Assistant Manager" :  true,
                "Assistant Manager" :     true,
                "Shift Manager" :         true,
                "Cleaning Captain" :      true,
                "Team Trainer" :          true,
                "Team Member" :           true,
                "Other" :                 true
            }

            

            // MongoDB Filter
            var positions = [ 
                { "positions.Shift Manager": true }, 
                { "positions.Team Member": true }, 
                { "positions.Team Trainer": true }, 
                { "positions.Cleaning Captain": true }, 
                { "positions.General Store Manager": true },
                { "positions.Assistant Manager": true},
                { "positions.Sr Assistant Manager": true},
                { "positions.Other": true}
            ];

            // Select All Positions 
            vm.clickAllPositions = function () {
                $timeout(function () {
                    
                    if (vm.positions.all) {
                    // select All                    
                    for (var prop in vm.positions) {
                        vm.positions[prop] = true;                
                    }
                    for (var i = 0; i < positions.length; i++) {
                        for (var prop in positions[i]) {
                            positions[i][prop] = true;
                        }
                    };
                    countPosition()

                } else {
                    // Deselect All
                    for (var prop in vm.positions) {
                        vm.positions[prop] = false;
                    }
                    for (var i = 0; i < positions.length; i++) {
                        for (var prop in positions[i]) {
                            positions[i][prop] = false;
                        }
                    };
                    countPosition()
                }
                
                load(vm.stores, positions, date1, date2)
                    .then(function (res) {
                        vm.data = res.data;
                    }, function (err) {
                        console.log(err)
                    })

                },0)
            }

            // click Position in Filter
            vm.selectPosition = function (str) { 
                
                $timeout(function() {
                    vm.selectAll(vm.positions)

                    for ( var i = 0; i < positions.length; i++ ) {
                        
                        if (positions[i][str] !== undefined) {
                            positions[i][str] = !positions[i][str];
                            if (positions[i][str]) {
                                vm.selectedPositions ++;
                            } else {
                                vm.selectedPositions --;
                            }
                            
                            break;
                        }
                    }
                    load(vm.stores, positions, date1, date2)
                    .then(function (res) {
                        vm.data = res.data;
                    }, function (err) {
                        console.log(err)
                    })

                }, 0);
                
            }

            // Count Positions That are true
            var countPosition = function () {
                vm.selectedPositions = 0;
                
                for ( var prop in vm.positions ) {
                    
                    console.log(vm.positions[prop])
                    
                    if (prop !== "all") {
                        if ( vm.positions[prop] ) vm.selectedPositions ++;
                        //if ( !vm.positions[prop] ) vm.selectedPositions --;
                    }
                }
                console.log(vm.selectedPositions)
            }

            countPosition();
        
            // Log Position text in row
            vm.printPosition = function (obj) {    
                for(var prop in obj) { 
                    if (obj[prop]) {
                        return prop;
                    }
                }
            }


        // API
        function load (stores, positions, dateGTE, dateLT) {
            console.log("calling API")
            
            var filterBy = {
                "stores": stores ,
                "positions": positions,
                "dateGTE": dateGTE,
                "dateLT":  dateLT
            }
            return $http.post("/api/application/filter", filterBy)
        }
        
        load(vm.stores, positions, date1, date2)
            .then(function (res) {
                vm.data = res.data;
            }, function (err) {
                console.log(err)
            })
        
        //Other
        vm.getCount = function (obj) {
            return Object.keys(obj).length;
        }


        // Links 
        vm.goToDoc = function (id) {
            $state.go('viewDoc',{id: id});
        }
        
  

    vm.selectAll(vm.location)
    vm.selectAll(vm.positions)

    }
})();

   