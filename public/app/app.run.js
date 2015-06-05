(function() {
    'use strict';

    angular
    .module('app')
    .run(run);

    function run($rootScope) {

        $rootScope.$on('$stateChangeSuccess',function(){
            $("html, body").animate({ scrollTop: 0 }, 100);
        });

    }
})();
