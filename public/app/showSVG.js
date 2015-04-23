(function() {
    'use strict';


angular
    .module('app')
    .directive('showSvg', function ($http, $timeout) {
        
        return {
            restrict: 'AE',
            controller: function ($scope, $http) {
               



            },
            


            link: function (scope, el, attr) {
                
                var getfile = function () {
                return $http.get('/api/test')
                    .then(function (res) {
                        //console.log(res.data)
                        var testfile = res.data
                        console.log(res.data)
                        
                        el.html(testfile)
                        
                    }, function (err) {
                        console.log(err)
                    })
                }

                getfile()

            }
        }
    })


})();