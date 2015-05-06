(function () {
angular
        .module('app')
        .directive('selectTime', selectTime);

    function selectTime($timeout) {
        var directive = {
            link: link,
            templateUrl: 'app/directives/selectTime/selectTime.html',
            restrict: 'EA',
            scope: {
                datavalue: "=",
                starttime: '=',
                endtime: "="
            },
            controller: function ($scope) {
                $scope.time = $scope.datavalue;
                //datavalue = $scope.time;
            }
        };
    
        return directive;

        function link(scope, element, attrs) {
            var id = attrs.pairwith;
            

            // hide list when loaded
            $( ".list-of-times").hide();
            
            // Click Events
            $(  element ).on('click', ".display-time", function () {
        
                // show list
                $( element ).find(".list-of-times").toggle();
            })

            $( element ).on('click', 'li', function() {
            
                // Change text to selected time
                scope.time = $(this).text();
                
                // Update ng-model for element
                scope.datavalue = $(this).text();
                
                // Hide list of times
                $( element ).find(".list-of-times").toggle();

                // Update Scope
                $timeout(function () {
                    scope.$apply();
                }, 0)



                // If N/A was Selected
                if (scope.datavalue === "N/A") {
                   $( '[data-pairwith|=' + id + ']' + '[data-select|="to"]').find(".display-time").val("N/A");
                } else 

                // Update available time on paired "to"
                if (scope.datavalue !== "ANY" && attrs.select === "from" ) {

                    $.when($( '[data-pairwith|=' + id + ']' + '[data-select|="to"]').find(".time").remove()).then(function () {
                        
                        // Change it back into 24 hour format
                        if ( scope.datavalue.charAt(scope.datavalue.length -2) === "P" ) {
                            var num = parseInt(scope.datavalue) + 12;
                            //alert(num)
                        } else {
                            var num = parseInt(scope.datavalue);
                            //alert(num)
                        }

                        //Pair Ending Time
                        var pairEndTime = $('[data-pairwith|=' + id + ']' + '[data-select|="to"]').attr("data-endtime")


                        // Add new time list
                        for (var i = num + 1 ; i <= pairEndTime; i++) { 
                            addTime(i, '[data-pairwith|=' + id + ']' + '[data-select|="to"]') 
                        }

                    });


                }
                
               
            });
            
            
            // Add times
            function addTime (i, el) {
                
                var prefix = " AM";
                
                if ( i > 12 && i < 25) {
                    prefix = " PM";
                    i -= 12;
                } if ( i >= 25 ) {
                    prefix = " AM";
                    i = i - 24;
                    console.log("yes and i is now ", i)
                }
                

                var newElement = '<li class="time">' + i + prefix + '</li>';
            
                $( el ).find(".times").append(newElement);

                
                
            }
            function load () {
    
                for (var i = scope.starttime; i < scope.endtime; i++) {  
                    addTime(i, element) 
                }
               
            }

            
            load();
           
            

            
                 
            // $timeout(function () {
            //     alert("calling apply")
            //     scope.$apply();
            // }, 100)
            


        }
    }

})();

// Event - click on element 
    // 1) Drop list of times
        // Event - Click on a Time
            // 1) replace element with selected time

// 8
