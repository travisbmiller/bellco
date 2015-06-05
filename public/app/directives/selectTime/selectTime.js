(function () {
angular
        .module('app')
        .directive('selectTime', selectTime);

    function selectTime($timeout, $window) {
        var directive = {
            link: link,
            templateUrl: 'app/directives/selectTime/selectTime.html',
            restrict: 'EA',
            scope: {
                datavalue: "=",
                starttime: '=',
                endtime: "=",
                position: "="
            },
            controller: function ($scope) {
                //$scope.time = $scope.datavalue;
                datavalue = $scope.time;
                
            }
        };
    
        return directive;

        function link(scope, element, attrs) {
            var id = attrs.pairwith;
            
            // hide list when loaded
            $( ".list-of-times").hide();
            
            // Click Events
            $(  element ).on('click', ".display-time", function () {
                
                //Grab vh and set hight of modal
                var vh = $(window).height();
                vh -= 100;
                vh + "px";

                // Grab Window Width
                var vw = $(window).width();

                // Setting CSS if Mobile
                if (vw < 640) {
                    
                    $('.list-of-times').css({
                        height: vh, 
                        left: "20px",
                        top: "50px",
                        width: (vw - 40) + "px"});
                }

                // show list
                $( element ).find(".list-of-times").toggle();
            })

            $(  element ).on('click', 'li', function() {
            
                // Change text to selected time
                scope.time = $(this).text();
                
                // Update ng-model for element
                scope.datavalue = $(this).text();
                
                // Hide list of times
                $( element ).find(".list-of-times").toggle();

                // If N/A was Selected
                if (scope.datavalue === "N/A") {
                    $( '[data-pairwith|=' + id + ']' + '[data-select|="to"]').find("input").val("N/A");
                    $( '[data-pairwith|=' + id + ']' + '[data-select|="to"]').trigger( "change" );
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
                 
                 // Update Scope
                $timeout(function () {
                    //console.log("calling scope.apply")
                    scope.$apply();
                }, 0)

               
            });


            // On Change Event for iput val for "to", when updated by clicking on "N/A" on from
            $( '[data-pairwith|=' + id + ']' + '[data-select|="to"]').on( "change", function () {
                
                if (scope.position === 2) {
                    // Grabbing new set value and updating parent scope
                    scope.datavalue = $( '[data-pairwith|=' + id + ']' + '[data-select|="to"]').find("input").val();
                    
                    $timeout(function () {
                        scope.$apply();
                        
                    }, 0)
                }
            });
        
            
            // Add times based of of Attr value
            function addTime (i, el) {
                // 1 = 1am 
                // 2 = 2am 
                // 3 = 3am 
                // 4 = 4am 
                // 5 = 5am 
                // 5 = 5am 
                // 6 = 6am 
                // 7 = 7am 
                // 8 = 8am 
                // 9 = 9am 
                // 10 = 10am 
                // 11 = 11am 
                // 12 = 12pm 
                // 13 = 1pm 
                // 14 = 2pm 
                // 15 = 3pm 
                // 16 = 4pm 
                // 17 = 5pm 
                // 18 = 6pm 
                // 19 = 7pm 
                // 20 = 8pm 
                // 21 = 9pm 
                // 22 = 10pm 
                // 23 = 11pm 
                // 24 = 12am 
                // 25 = 1am
                
                var prefix = " AM";
                
                if ( i > 11 && i < 24) {
                    prefix = " PM";
                    if (  i >= 13) i -= 12;
                } if ( i >= 24 ) {
                    prefix = " AM";
                    if ( i === 24) {
                        i -= 12;
                    }
                    if (i > 24) { 
                        i -= 24;
                    };
                }
                
                // Create new element
                var newElement = '<li class="time">' + i + prefix + '</li>';
            
                // Add new element
                $( el ).find(".times").append(newElement);
            }
            
            function load () {
                // Calling add time based of the value of start time and end time
                for (var i = scope.starttime; i < scope.endtime; i++) {  
                    addTime(i, element) 
                }
            }

            load();

        }
    }

})();
