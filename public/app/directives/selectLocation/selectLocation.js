(function () {
    'use strict';


    angular
        .module('app')
        .directive('date', date);

    function date() {
        var directive = {
            link: link,
            templateUrl: 'app/directives/selectLocation/selectLocation.html',
            restrict: 'EA'
        };
    
        return directive;

        function link(scope, element, attrs) {
          $( ".date-picker" ).datepicker({
            inline: true,
            showOtherMonths: true,
        });
        }
    }

})();

